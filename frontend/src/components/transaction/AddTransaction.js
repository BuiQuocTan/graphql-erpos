import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddTransaction.module.css";

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/actions/transaction/addTransactionAction";
import PageTitle from "../page-header/PageHeader";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALLACCOUNTS_QUERY } from "../../queries/account.query";
import { CREATE_TRANSACTION_MUTATION } from "../../mutations/transaction.mutation";

const AddTransaction = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  let [date, setDate] = useState(moment());
  const [loader, setLoader] = useState(false);

  const [accounts, setAccounts] = useState(null);

  const [getAllAccounts, { data: allAccountsInfo, error: allAccountsError }] = useLazyQuery(GET_ALLACCOUNTS_QUERY);
  const [createTransaction, { data: createdTransaction, error: createTransactionError }] = useMutation(CREATE_TRANSACTION_MUTATION);

  useEffect(() => {
    if (allAccountsInfo) {
      console.log("all accounts info => ", allAccountsInfo.getAllAccounts.entire);
      setAccounts(allAccountsInfo.getAllAccounts.entire)
    }
  }, [allAccountsInfo]);

  useEffect(() => {
    if (allAccountsError) {
      console.log("all accouns error => ", allAccountsError);
      toast.error("error occured while getting accounts");
    }
  }, [allAccountsError])

  useEffect(() => {
    if (createdTransaction) {
      console.log("created transaction => ", createdTransaction);
      try {
        dispatch(addTransaction(createdTransaction.createSingleTransaction));
      } catch (e) {
        console.log(e.message)
      }
      form.resetFields();
      setLoader(false);
      navigate("/transaction");
      toast.success("Payment Successfully done");
    }
  }, [createdTransaction]);

  useEffect(() => {
    if (createTransactionError) {
      console.log("create transaction error => ", createTransactionError);
      toast.error("Something went wrong");
      setLoader(false);
    }
  }, [createTransactionError]);

  useEffect(() => {
    getAllAccounts({
      variables: { query: "sa" }
    });
  }, []);

  const onFinish = async (values) => {
    createTransaction({
      variables: {
        ...values,
        amount: parseFloat(values.amount),
        date: date._d.toString()
      }
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
    <>
      <PageTitle title="Back" />
      <Row className="mr-top">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={12}
          className="column-design border rounded bg-white"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Transaction
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 8,
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
              <Form.Item label="Date" required>
                <DatePicker
                  defaultValue={moment()}
                  onChange={(value) => setDate(value?._d)}
                  style={{ marginBottom: "10px" }}
                  label="date"
                  name="date"
                  className="date-picker"
                  rules={[
                    {
                      required: true,
                      message: "Please input date!",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="debit_id"
                label="Debit Account"
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
                  placeholder="Select Debit ID"
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
                name="credit_id"
                label="Credit Account"
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
                  placeholder="Select Credit ID"
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
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please input amount!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Particulars"
                name="particulars"
                rules={[
                  {
                    required: true,
                    message: "Please input particulars!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.payNowBtnContainer}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Pay Now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddTransaction;
