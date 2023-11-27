import { Alert, Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

import { useMutation } from "@apollo/client";
import { UPDATE_CUSTOMER_MUTATION } from "../../mutations/customer.mutation";

function UpdateCust() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const cust = data;
  const [initValues, setInitValues] = useState({
    name: cust.name,
    phone: cust.phone,
    address: cust.address,
    due_amount: cust.due_amount,
  });

  const [updateCustomer, { data: updatedCustomer, error: updateCustomerError }] = useMutation(UPDATE_CUSTOMER_MUTATION);

  useEffect(() => {
    if (updatedCustomer) {
      setSuccess(true);
      toast.success("Customer has been updated");
      setInitValues({});
    }
  }, [updatedCustomer]);

  useEffect(() => {
    if (updateCustomerError) {
      setSuccess(false);
      console.log("updated customer error => ", updateCustomerError);
      toast.error("Something went wrong");
    }
  }, [updateCustomerError]);

  const onFinish = (values) => {
    updateCustomer({
      variables: {
        id: parseInt(id),
        ...values
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
      <PageTitle
        title={`Update Customer/ ${id}`}
        subtitle="Update customer information"
      />
      <div className="text-center">
        <div className="">
          <Row className="mr-top">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={14}
              className="border rounded column-design"
            >
              {success && (
                <div>
                  <Alert
                    message={`customer details updated successfully`}
                    type="success"
                    closable={true}
                    showIcon
                  />
                </div>
              )}
              <Title level={3} className="m-3 text-center">
                Edit Customer Form
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
                  span: 16,
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
                      message: "Please input customer name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input customer Phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input customer Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Due Amount"
                  name="due_amount"
                  rules={[
                    {
                      type: Number,
                      required: true,
                      message: "Please input customer amount!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button block type="primary" htmlType="submit" shape="round">
                    Update Now
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateCust;
