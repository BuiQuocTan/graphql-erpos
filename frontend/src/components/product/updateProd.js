import React, { useEffect, useState } from "react";

import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT_MUTATION } from "../../mutations/product.mutation";

function UpdateProd() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const prod = data;
  const [initValues, setInitValues] = useState({
    name: prod.name,
    quantity: prod.quantity,
    purchase_price: prod.purchase_price,
    sale_price: prod.sale_price,
  });

  const [updateProduct, { data: updatedProduct, error: updateProductError }] = useMutation(UPDATE_PRODUCT_MUTATION);

  useEffect(() => {
    if (updatedProduct) {
      console.log("updated product => ", updatedProduct);

      setSuccess(true);
      toast.success("Product details is updated");
      setInitValues({});
    }
  }, [updatedProduct]);

  useEffect(() => {
    if (updateProductError) {
      console.log("updated product error => ", updateProductError);
      toast.error("Something went wrong");
    }
  }, [updateProductError]);

  const onFinish = (values) => {
    updateProduct({
      variables: {
        id: parseInt(id),
        name: values.name,
        purchase_price: parseFloat(values.purchase_price),
        quantity: parseInt(values.quantity),
        sale_price: parseFloat(values.sale_price)
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title={`Back`} />
      <div className="text-center">
        <div className="">
          <Row className="mr-top">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={14}
              className="border rounded column-design "
            >
              {success && (
                <div>
                  <Alert
                    message={`Product details updated successfully`}
                    type="success"
                    closable={true}
                    showIcon
                  />
                </div>
              )}
              <Card bordered={false} className="criclebox h-full">
                <Title level={3} className="m-3 text-center">
                  Edit Product Form
                </Title>
                <Form
                  initialValues={{
                    ...initValues,
                  }}
                  form={form}
                  className="m-4"
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 20,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    fields={[{ name: "Name" }]}
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input product name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Quantity"
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product Quantity!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Purchase Price"
                    name="purchase_price"
                    rules={[
                      {
                        required: true,
                        message: "Please input Purchase price !",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Sale Price"
                    name="sale_price"
                    rules={[
                      {
                        type: Number,
                        required: true,
                        message: "Please input  Sale Price!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    wrapperCol={{
                      offset: 8,
                    }}
                  >
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      shape="round"
                    >
                      Update Now
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateProd;
