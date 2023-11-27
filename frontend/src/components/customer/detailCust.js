import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCustomer } from "../../redux/actions/customer/deleteCustomerAction";
import { loadSingleCustomer } from "../../redux/actions/customer/detailCustomerAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import CustomerInvoiceList from "../Card/CustomerInvoiceList";
import CustomerReturnInvoiceList from "./ListCard/CustomerReturnInvoiceList";
import CustomerTransactionList from "./ListCard/CustomerTransactionList";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ONECUSTOMER_QUERY } from "../../queries/customer.query";
import { DELETE_CUSTOMER_MUTATION } from "../../mutations/customer.mutation";

//PopUp

const DetailCust = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customers.customer);

  const [getOneCustomer, { data: oneCustomerInfo, error: oneCustomerError }] = useLazyQuery(GET_ONECUSTOMER_QUERY);
  const [deleteCustomer, { data: deletedCustomer, error: deleteCustomerError }] = useMutation(DELETE_CUSTOMER_MUTATION);

  useEffect(() => {
    if (oneCustomerInfo) {
      console.log("one customer info => ", oneCustomerInfo);
      dispatch(loadSingleCustomer({ data: oneCustomerInfo.getSingleCustomer }))
    }
  }, [oneCustomerInfo]);

  useEffect(() => {
    if (oneCustomerError) {
      console.log("one customer error => ", oneCustomerError);
      toast.error("Error occured while getting customer");
    }
  }, [oneCustomerError]);

  useEffect(() => {
    if (deletedCustomer) {
      setVisible(false);
      toast.warning(`Customer : ${customer.name} is removed `);
      return navigate("/customer");
    }
  }, [deletedCustomer]);

  useEffect(() => {
    if (deleteCustomerError) {
      setVisible(false);
      console.log("delete customer error => ", deleteCustomerError);
      toast.error("Something went wrong");
    }
  }, [deleteCustomerError]);

  useEffect(() => {
    getOneCustomer({
      variables: {
        id: parseInt(id)
      }
    })
  }, [id]);

  //Delete Customer
  const onDelete = () => {
    deleteCustomer({
      variables: {
        id: parseInt(id),
        status: false
      }
    });
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Back " subtitle=" " />

      <div className="mr-top">
        {customer ? (
          <Fragment key={customer.id}>
            <Card bordered={false} style={{}}>
              <div className="card-header d-flex justify-content-between m-3">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {customer.id} | {customer.name}
                  </span>
                </h5>
                <div className="text-end">
                  <Link
                    className="m-2"
                    to={`/customer/${customer.id}/update`}
                    state={{ data: customer }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    ></Button>
                  </Link>
                  <Popover
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Yes Please !
                        </Button>
                      </a>
                    }
                    title="Are you sure you want to delete ?"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      DetailCust
                      shape="round"
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popover>
                </div>
              </div>
              <div className="card-body m-2">
                <p>
                  <Typography.Text strong>Phone Number :</Typography.Text>{" "}
                  {customer.phone}
                </p>

                <p>
                  <Typography.Text strong>Address :</Typography.Text>{" "}
                  {customer.address}
                </p>

                <p>
                  <Typography.Text strong>Due Amount :</Typography.Text>{" "}
                  {customer.due_amount}
                </p>
              </div>
              <CustomerInvoiceList
                list={customer?.saleInvoice}
                linkTo="/sale"
              />
              <CustomerReturnInvoiceList
                list={customer?.allReturnSaleInvoice}
              />
              <CustomerTransactionList list={customer?.allTransaction} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailCust;
