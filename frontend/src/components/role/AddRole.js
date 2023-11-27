import {
  Button,
  Card,
  Col, Dropdown, Form,
  Input, Menu, Row,
  Table,
  Typography
} from "antd";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALLROLES_QUERY } from "../../queries/role.query";
import { CREATE_ROLE_MUTATION } from "../../mutations/role.mutation";

function CustomTable({ list }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Link to={`/role/${id}/`}>
          <button className="btn btn-dark btn-sm"> View</button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>,
    };
  });

  const addKeys = (arr) => {
    console.log("arr =>", arr);
    arr.map((i) => ({ ...i, key: i.id }));
    return arr;
  }

  return (
    <Card>
      <div className="text-center my-2 d-flex justify-content-between">
        <h5 className="role-list-title">Role List</h5>
        {list && (
          <div>
            <CSVLink
              data={list}
              className="btn btn-dark btn-sm mb-1"
              filename="roles"
            >
              Download CSV
            </CSVLink>
          </div>
        )}
      </div>

      {list && (
        <div style={{ marginBottom: "30px" }}>
          <Dropdown
            overlay={
              <Menu onClick={colVisibilityClickHandler} items={columnItems} />
            }
            placement="bottomLeft"
          >
            <Button className="column-visibility">Column Visibility</Button>
          </Dropdown>
        </div>
      )}

      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
}

const Role = () => {
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();

  const [getAllRoles, { data: allRoles, error: allRolesError }] = useLazyQuery(GET_ALLROLES_QUERY);
  const [createRole, { data: createdRole, error: createRoleError }] = useMutation(CREATE_ROLE_MUTATION);

  useEffect(() => {
    if (allRoles) {
      console.log("all roles => ", allRoles);
      setList(allRoles.getAllRole);
    }
  }, [allRoles]);

  useEffect(() => {
    if (allRolesError) {
      console.log("all roles error => ", allRolesError);
      toast.error("Error occured while getting all roles");
    }
  }, [allRolesError]);

  useEffect(() => {
    if (createdRole && createdRole.createSingleRole) {
      console.log("created role => ", createdRole);
      setLoader(false);
      toast.success("New role has been created");
      form.resetFields();
      const newList = [...list];
      newList.push(createdRole.createSingleRole);
      setList(newList);
    }
  }, [createdRole]);

  useEffect(() => {
    if (createRoleError) {
      setLoader(false);
      toast.error("Something went wrong");
      console.log("create role error => ", createRoleError);
    }
  }, [createRoleError]);

  useEffect(() => {
    getAllRoles();
  }, []);

  const { Title } = Typography;

  const onFinish = async (values) => {
    createRole({
      variables: { name: values.name }
    })
    setLoader(true);
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding role");
    setLoader(false);
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
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 text-center">
            Add New Role
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "100px" }}
            eventKey="role-form"
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div>
              <Form.Item
                style={{ marginBottom: "20px" }}
                label="Name"
                name="name"
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
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 6,
                  span: 12,
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  type="primary"
                  size="small"
                  htmlType="submit"
                  block
                  loading={loader}
                >
                  Add New Role
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
      <hr />
      <CustomTable list={list} />
    </Fragment >
  );
};

export default Role;
