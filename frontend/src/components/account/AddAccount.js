import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddNewAccount.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../../redux/actions/account/addAccountAction";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALLACCOUNTS_QUERY } from "../../queries/account.query";
import { CREATE_ACCOUNT_MUTATION } from "../../mutations/account.mutation";

const AddAccount = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const [accounts, setAccounts] = useState(null);

  const [getAllAccounts, { data: allAccounts, error: getAccountsError }] = useLazyQuery(GET_ALLACCOUNTS_QUERY);
  const [createAccount, { data: createdAccount, error: createAccountError }] = useMutation(CREATE_ACCOUNT_MUTATION);

  useEffect(() => {
    if (createdAccount && createdAccount.createSingleAccount) {
      console.log("created account => ", createdAccount);
      setLoader(false);
      dispatch(addAccount(createdAccount.createSingleAccount));
      toast.success("Account Added");
      form.resetFields();
    }
  }, [createdAccount]);

  useEffect(() => {
    if (createAccountError) {
      console.log("create account error => ", createAccountError);
      toast.error("Something went wrong");
      setLoader(false);
    }
  }, [createAccountError]);

  useEffect(() => {
    if (allAccounts) {
      console.log("all accounts => ", allAccounts);
      setAccounts(allAccounts.getAllAccounts.entire);
    }
  }, [allAccounts]);

  useEffect(() => {
    if (getAccountsError) {
      console.log("get accounts error => ", getAccountsError);
      toast.error("Error occured while getting all accounts")
    }
  }, [getAccountsError])


  useEffect(() => {
    getAllAccounts({
      variables: { query: "ma" }
    });
  }, []);

  const onFinish = async (values) => {
    createAccount({
      variables: values
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <Row className="mr-top ">
        <Col xs={24} sm={24} md={24} lg={16} xl={12} className="border rounded column-design">
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Add Account
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 7,
              }}
              labelWrap
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
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input debit account!",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="account_id"
                label="Account Type"
                rules={[
                  {
                    required: true,
                    message: "Please input debit account!",
                  },
                ]}
              >
                <Select
                  loading={!accounts}
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="Select Account Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {accounts &&
                    accounts.map((acc) => (
                      <Select.Option key={acc.id} value={acc.id}>
                        {acc.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addNewAccountBtnContainer}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Add New Account
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddAccount;
