import { Alert, Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

import { useMutation } from "@apollo/client";
import { UPDATE_CATEGORY_MUTATION } from "../../mutations/productCategory.mutation";

function UpdateProductCategory() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const category = data;
  const [initValues, setInitValues] = useState({
    name: category.name,
  });

  const [updateCategory, { data: updatedCategory, loading: updatingCategory, error: updateCategoryError }] = useMutation(UPDATE_CATEGORY_MUTATION);

  useEffect(() => {
    if (updatedCategory) {
      console.log("updated category => ", updatedCategory);
      setSuccess(true);
      toast.success("category details is updated");
      setInitValues({});
    }
  }, [updatedCategory]);

  useEffect(() => {
    if (updateCategoryError) {
      console.log("updated category error => ", updateCategoryError);
      setSuccess(false);
      toast.error("category name must be unique");
    }
  }, [updateCategoryError]);

  const onFinish = (values) => {
    updateCategory({
      variables: {
        id: parseInt(id),
        name: values.name
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
        title={`Update Category/ ${id}`}
        subtitle="Update Category information"
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
                    message={`Category details updated successfully`}
                    type="success"
                    closable={true}
                    showIcon
                  />
                </div>
              )}
              <Title level={3} className="m-3 text-center">
                Edit Category Form
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
                      message: "Please input Category name!",
                    },
                  ]}
                >
                  <Input />
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

export default UpdateProductCategory;
