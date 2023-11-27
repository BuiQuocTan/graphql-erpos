import {
  Button, Card, DatePicker, Form,
  Input
} from "antd";
import moment from "moment";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { loadSinglePurchase } from "../../redux/actions/purchase/detailPurchaseAction";
import PurchaseProductListCard from "../Card/purchaseInvoice/PurchaseProductListCard";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ONEPURCHASE_QUERY } from "../../queries/purchaseInvoice.query";
import { CREATE_ONERETURNPURCHASEINVOICE_QUERY } from "../../mutations/returnPurchaseInvoice.mutation"
import { toast } from "react-toastify";

const AddReturnPurchase = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [totalReturnAmount, setTotalReturnAmount] = useState(0);
  // make a button click fucnciton to set loading to true
  const onClick = () => {
    setLoading(true);
  };

  //dispatch
  const dispatch = useDispatch();
  const purchase = useSelector((state) => state.purchases.purchase);
  const { singlePurchaseInvoice } = purchase ? purchase : {};
  const [list, setList] = useState([]);
  const [date, setDate] = useState(moment());

  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);

  const [getOnePurchaseInvoice, { data: onePurchaseInvoice, error: purchaseInvoiceError }] = useLazyQuery(GET_ONEPURCHASE_QUERY);
  const [creteOneReturnPurchaseInvoice, { data: createdReturnPurchaseInvoice, error: createReturnPurchaseInvoiceError }] = useMutation(CREATE_ONERETURNPURCHASEINVOICE_QUERY);

  useEffect(() => {
    if (onePurchaseInvoice) {
      console.log("one purchase info => ", onePurchaseInvoice.getSinglePurchaseInvoice);
      dispatch(loadSinglePurchase({ data: onePurchaseInvoice.getSinglePurchaseInvoice }));
    }
  }, [onePurchaseInvoice]);

  useEffect(() => {
    if (purchaseInvoiceError) {
      console.log("one purchase info error => ", purchaseInvoiceError);
      toast.error("Error occured while getting puchase invoice");
    }
  }, [purchaseInvoiceError]);

  useEffect(() => {
    if (createdReturnPurchaseInvoice) {
      console.log("created return purchase invoice => ", createdReturnPurchaseInvoice);
      toast.success("Return Purchase Added Successfully");
      setLoading(false);
      navigate(-1);
    }
  }, [createdReturnPurchaseInvoice]);

  useEffect(() => {
    if (createReturnPurchaseInvoiceError) {
      console.log("create return purhcase invoice error => ", createReturnPurchaseInvoiceError);
      toast.error("Somthing went wrong");
      setLoading(false);
    }
  }, [createReturnPurchaseInvoiceError])

  useEffect(() => {
    getOnePurchaseInvoice({
      variables: {
        id: parseInt(id)
      }
    })
  }, [id]);

  useEffect(() => {
    if (singlePurchaseInvoice) {
      setList(
        singlePurchaseInvoice.purchaseInvoiceProduct.map((item) => {
          return {
            ...item,
            return_quantity: 0,
            remain_quantithy: item.product_quantity,
          };
        })
      );
    }
  }, [singlePurchaseInvoice]);

  const submitHandler = useCallback(
    ({ note }) => {
      const payload = {
        purchaseInvoice_id: parseInt(id),
        note,
        date: date._d.toString(),

        returnPurchaseInvoiceProduct: Object.entries(formData).map(
          ([id, { value, price }]) => {
            return {
              product_id: parseInt(id),
              product_quantity: value,
              product_purchase_price: price,
            };
          }
        ),
      };

      creteOneReturnPurchaseInvoice({
        variables: payload
      });
    },

    [formData]
  );

  const updateHandler = useCallback(
    ({ id, value, price }) => {
      const item = list.find((item) => item.product_id === id);
      if (item) {
        formData[id] = { value, price };
        item.return_quantity = value;
        item.remain_quantity = item.product_quantity - value;
        setList([...list]);
        setFormData({ ...formData });
      }
    },

    [list]
  );

  const totalReturnQuantity = () => {
    return list.reduce((acc, item) => {
      return acc + item.return_quantity * item.product_purchase_price;
    }, 0);
  };

  // set total return amount to state from totalReturnQuantity
  useEffect(() => {
    setTotalReturnAmount(totalReturnQuantity());
  }, [list]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Back " />
      <div className="mr-top">
        {singlePurchaseInvoice ? (
          <Fragment key={singlePurchaseInvoice.id}>
            <Card bordered={false} className="criclebox h-full m-3">
              <div className="card-header d-flex justify-content-between">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {singlePurchaseInvoice.id} |
                  </span>
                </h5>
              </div>
              <div className="">
                <PurchaseProductListCard
                  formData={formData}
                  updateReturn={true}
                  returnOnChange={updateHandler}
                  list={list}
                />
                <div className="d-flex justify-content-between card-body">
                  <div className="mb-auto">
                    <p
                      className="mr-left"
                      style={{
                        backgroundColor: "#FDCCCC",
                        padding: "10px",
                        paddingRight: "20px",
                        borderRadius: "2px",
                      }}
                    >
                      Total Return Amount :
                      <strong>
                        {"  "}
                        {totalReturnAmount ? totalReturnAmount : 0}
                      </strong>
                    </p>
                  </div>
                  <div className="mr-right">
                    <Form
                      labelAlign="right"
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 26,
                      }}
                      form={form}
                      onFinish={submitHandler}
                      autoComplete="off"
                    >
                      <Form.Item name="date" label="Date" className="mb-2">
                        <DatePicker
                          defaultValue={moment(new Date())}
                          onChange={(date) => setDate(date._d)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item name="note" label="Note" className="mb-2">
                        <Input.TextArea placeholder="Note" />
                      </Form.Item>

                      <Form.Item style={{ marginTop: "20px" }} className="mb-2">
                        <Button
                          onClick={onClick}
                          htmlType="submit"
                          type="danger"
                          block
                          loading={loading}
                        >
                          Make A Return
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AddReturnPurchase;
