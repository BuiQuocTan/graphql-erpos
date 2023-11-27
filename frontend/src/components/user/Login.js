import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/user/loginUserAction";

import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../queries/user.query";

//TODO : redirect to home

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { Title } = Typography;

  const [login, { data, error }] = useLazyQuery(LOGIN_QUERY);

  useEffect(() => {
    if (data && data.login) {
      const { message } = data.login;
      if (message) {
        toast.error(message);
      } else {
        (() => {
          const resp = dispatch(addUser(data.login));

          if (resp === "success") {
            // navigate("/dashboard");
            window.location.href = "/dashboard";
          }
        })();
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error)
      toast.error("Something went wrong with the server.");
    }
  }, [error]);

  const onFinish = async (values) => {
    login({
      variables: {
        username: values.username,
        password: values.password
      }
    });
    setLoader(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
    toast.error("Error at login Please try again");
  };

  return (
    <>
      <Row className="card-row">
        <Col span={24}>
          <Card bordered={false} className={styles.card}>
            <Title level={3} className="m-3 text-center">
              Login
            </Title>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                className="mb-1"
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="mb-2"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className={styles.submitBtnContainer}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item className={styles.loginTableContainer}>
                <Row>
                  <Col span={24}>
                    <LoginTable />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
