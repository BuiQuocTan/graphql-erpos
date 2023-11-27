import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteSupplier } from "../../redux/actions/supplier/deleteSupplierAction";
import { loadSupplier } from "../../redux/actions/supplier/detailSupplierAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import "./suppliers.css";

import { CSVLink } from "react-csv";
import SupplierInvoiceTable from "../Card/SupplierInvoiceList";
import SupplierReturnInvoiceList from "./ListCard/SupplierReturnInvoiceList";
import SupplierTransactionList from "./ListCard/SupplierTransactionList";

import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ONESUPPLIER_QUERY } from "../../queries/supplier.query";
import { DELETE_SUPPLIER_MUTATION } from "../../mutations/supplier.mutation";
//PopUp

const DetailsSup = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.suppliers.supplier);

  const [getOneSupplier, { data: oneSupplierDetail, error: supplierError }] = useLazyQuery(GET_ONESUPPLIER_QUERY);
  const [deleteOneSuppler, { data: deletedSupplier, error: deletedSupplierError }] = useMutation(DELETE_SUPPLIER_MUTATION);

  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (oneSupplierDetail) {
      console.log("one supplier detail => ", oneSupplierDetail)
      dispatch(loadSupplier({ data: oneSupplierDetail.getSingleSupplier }));
    }
  }, [oneSupplierDetail]);

  useEffect(() => {
    if (supplierError) {
      console.log("one supplier error => ", supplierError);
      toast.error("Error occured while getting a supplier");
    }
  }, [supplierError]);

  useEffect(() => {
    if (deletedSupplier) {
      console.log("deleted supplier => ", deletedSupplier);
      dispatch(deleteSupplier(id));
      setVisible(false);
      toast.warning(`Supplier : ${supplier.name} is removed `);
      return navigate("/supplier");
    }
  }, [deletedSupplier]);

  useEffect(() => {
    if (deletedSupplierError) {
      console.log("deleted suppler error => ", deletedSupplierError);
      toast.error("Something went wrong");
    }
  }, [deletedSupplierError]);

  useEffect(() => {
    getOneSupplier({
      variables: { id: parseInt(id) }
    });
  }, [id]);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  //Delete Supplier
  const onDelete = () => {
    deleteOneSuppler({
      variables: {
        id: parseInt(id),
        status: false
      }
    });
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Back " subtitle={`Supplier ${id} information`} />

      <div className="mr-top">
        {supplier ? (
          <Fragment key={supplier.id}>
            <Card bordered={false} style={{}}>
              <div className="card-header d-flex justify-content-between" style={{ padding: 0 }}>
                <div className="w-50">
                  <h5>
                    <i className="bi bi-person-lines-fill"></i>
                    <span className="mr-left">
                      ID : {supplier.id} | {supplier.name}
                    </span>
                  </h5>
                </div>
                <div className="text-end w-50">
                  <Link
                    className="me-3 d-inline-block"
                    to={`/supplier/${supplier.id}/update`}
                    state={{ data: supplier }}
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
                      shape="round"
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popover>
                </div>
              </div>
              <div className="mt-3 mb-3">
                <p>
                  <Typography.Text className="font-semibold">
                    Phone Number : {supplier.phone}
                  </Typography.Text>{" "}
                </p>

                <p>
                  <Typography.Text className="font-semibold">
                    Address :
                  </Typography.Text>{" "}
                  {supplier.address}
                </p>

                <p>
                  <Typography.Text strong>Due Amount :</Typography.Text>{" "}
                  {supplier.due_amount}
                </p>
              </div>
              <hr />
              <h6 className="font-semibold m-0 text-center">
                All Invoice Information
              </h6>
              <div className="text-center m-2 d-flex justify-content-end">
                {supplier.purchaseInvoice && (
                  <div>
                    <CSVLink
                      data={supplier.purchaseInvoice}
                      className="btn btn-dark btn-sm mb-1"
                      filename="suppliers"
                    >
                      Download CSV
                    </CSVLink>
                  </div>
                )}
              </div>
              <SupplierInvoiceTable
                list={supplier.purchaseInvoice}
                linkTo="/purchase"
              />
              <SupplierReturnInvoiceList
                list={supplier?.allReturnPurchaseInvoice}
              />
              <SupplierTransactionList list={supplier?.allTransaction} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsSup;
