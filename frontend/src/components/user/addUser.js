import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography
} from "antd";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/actions/designation/getDesignationAction";
import { addStaff } from "../../redux/actions/user/addStaffAciton";
import { toast } from "react-toastify";

import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ALLDESCIGNATIONS_QUERY } from "../../queries/designation.query";
import { GET_ALLROLES_QUERY } from "../../queries/role.query";
import { ADD_USER_MUTATION } from "../../mutations/user.mutation";

const AddUser = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { Option } = Select;
  const [form] = Form.useForm();

  const designation = useSelector((state) => state.designations?.list);

  const [addUser, { data: addedUser, error: addUserError }] = useMutation(ADD_USER_MUTATION);
  const [getAllDesignations, { data: allDesignatonsData, error: allDesignationsError }] = useLazyQuery(GET_ALLDESCIGNATIONS_QUERY);
  const [getAllRoles, { data: allRolessData, error: allRolesError }] = useLazyQuery(GET_ALLROLES_QUERY);

  const fetchAllDesignations = useCallback((props) => {
    getAllDesignations({
      variables: props
    })
  });

  useEffect(() => {
    if (allDesignatonsData) {
      console.log("all designations => ", allDesignatonsData)
      dispatch(loadAllDesignation(allDesignatonsData.getAllDesignation));
    }
  }, [allDesignatonsData]);

  useEffect(() => {
    if (allDesignationsError) {
      console.log("all designation error => ", allDesignationsError);
      toast.error("error occured while getting designations");
    }
  }, [allDesignationsError]);

  const fetchAllRoles = useCallback((props) => {
    getAllRoles({
      variables: props
    })
  });

  useEffect(() => {
    if (allRolessData) {
      console.log("all roles => ", allRolessData);
    }
  }, [allRolessData]);

  useEffect(() => {
    if (allRolesError) {
      console.log("all roles error => ", allRolesError);
      toast.error("Error occured while getting roles")
    }
  }, [allRolesError]);

  useEffect(() => {
    fetchAllDesignations();
    fetchAllRoles();
  }, []);

  useEffect(() => {
    if (addedUser && addedUser.createUser) {
      const { message } = addedUser.createUser;
      if (message) {
        toast.error(message);
      } else {
        dispatch(addStaff(addedUser.createUser));
        toast.success("User added successfully");
        form.resetFields();
      }
    }
  }, [addedUser]);

  useEffect(() => {
    if (addUserError) {
      console.log("add user error => ", addUserError);
      toast.error("something went wrong");
    }
  }, [addUserError]);

  const onFinish = async (values) => {
    addUser({
      variables: {
        ...values,
        designation_id: parseInt(values.designation_id),
        join_date: values.join_date._d.toString(),
        leave_date: values.leave_date._d.toString()
      }
    });
    console.log({
      ...values,
      designation_id: parseInt(values.designation_id),
      join_date: values.join_date._d.toString(),
      leave_date: values.leave_date._d.toString()
    })
    setLoader(false);
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment bordered={false}>
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
              Add New Staff
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
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
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Joining Date"
                name="join_date"
                rules={[
                  {
                    required: true,
                    message: "Please input joining date!",
                  },
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Leave Date"
                name="leave_date"
                rules={[
                  {
                    required: true,
                    message: "Please input leave date!",
                  },
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Pleases Select Type!",
                  },
                ]}
                label="Role"
                name="role"
                style={{ marginBottom: "20px" }}
              >
                <Select
                  loading={!allRolessData}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                >
                  {allRolessData && allRolessData.getAllRole &&
                    allRolessData.getAllRole.map((role) => (
                      <Option key={role.name}>{role.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Id No"
                name="id_no"
                rules={[
                  {
                    required: true,
                    message: "Please input id no",
                  },
                ]}
              >
                <Input placeholder="OE-012" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input phone",
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
                    message: "Please input address",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Salary"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Please input salary",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Blood Group"
                name="blood_group"
                rules={[
                  {
                    required: true,
                    message: "Please input blood group",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Pleases Select Designation!",
                  },
                ]}
                label="Designation"
                name={"designation_id"}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  loading={!designation}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                >
                  {designation &&
                    designation.map((desg) => (
                      <Option key={desg.id}>{desg.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  block
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                >
                  Add New Staff
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddUser;
