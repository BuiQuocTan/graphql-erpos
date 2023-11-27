import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDesignation } from "../../redux/actions/designation/addDesignationAciton";
import UploadMany from "../Card/UploadMany";
import { toast } from "react-toastify";
import styles from "./AddDesignation.module.css";

import { useMutation } from "@apollo/client";
import { CREATE_DESCIGNATION_MUTATION } from "../../mutations/designaton.mutation";

const AddDesignation = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [loader, setLoader] = useState(false);
  const onClickLoading = () => {
    setLoader(true);
  };

  const [form] = Form.useForm();

  const [createDesignation, { data: createdDesignation, error: createDesignationError }] = useMutation(CREATE_DESCIGNATION_MUTATION);

  useEffect(() => {
    if (createdDesignation && createdDesignation.createDesignation) {
      console.log("created designation => ", createdDesignation);
      setLoader(false);
      form.resetFields();
      dispatch(addDesignation(createdDesignation.createDesignation));
      toast.success("designation Added");
    }
  }, [createdDesignation]);

  useEffect(() => {
    if (createDesignationError) {
      console.log("craate designation error => ", createDesignationError);
      setLoader(false);
      toast.error("Error in adding designation try again");
    }
  }, [createDesignationError]);

  const onFinish = async (values) => {
    createDesignation({
      variables: values
    });
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Row className="mr-top" justify="space-between" gutter={[0, 30]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          className="rounded column-design"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Add designation
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input designation name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addDesignationBtnContainer}
              >
                <Button
                  onClick={onClickLoading}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                >
                  Add designation
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className="rounded column-design">
          <Card bordered={false} className={styles.importCsvCard}>
            <Title level={4} className="m-2 text-center">
              Import From CSV
            </Title>
            <UploadMany urlPath={"designation"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddDesignation;
