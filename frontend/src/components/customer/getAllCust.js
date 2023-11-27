import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./customer.css";

import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";

import { useLazyQuery } from "@apollo/client";
import { GET_ALLCUSTOMERS_QUERY } from "../../queries/customer.query";
import { toast } from "react-toastify";

function CustomTable({ list, total, status, fetchAllCustomers }) {
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
      render: (name, { id }) => <Link to={`/customer/${id}`}>{name}</Link>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    // {
    //   title: "Due Amount",
    //   dataIndex: "due_amount",
    //   key: "due_amount",
    //   responsive: ["md"],
    // },
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

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div>
      <div>
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
      </div>
      <div>
        <Table
          scroll={{ x: true }}
          loading={!list}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,

            onChange: (page, limit) => {
              fetchAllCustomers({ page, limit, status })
            },
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}

const GetAllCust = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.customers.list);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("true");

  const [getAllCustomers, { data: allCustomersInfo, error: allCustomersError }] = useLazyQuery(GET_ALLCUSTOMERS_QUERY);

  const fetchAllCustomers = useCallback((props) => {
    getAllCustomers({
      variables: props
    });
  });

  useEffect(() => {
    if (allCustomersInfo) {
      console.log("all customers info => ", allCustomersInfo.getAllCustomers);
      if (allCustomersInfo.getAllCustomers.allCustomers)
        dispatch(loadAllCustomer(allCustomersInfo.getAllCustomers.allCustomers))
      else if (allCustomersInfo.getAllCustomers.aggregations)
        setTotal(allCustomersInfo.getAllCustomers.aggregations._count.id)
    }
  }, [allCustomersInfo]);

  useEffect(() => {
    if (allCustomersError) {
      console.log("all customers error => ", allCustomersError);
      toast.error("Error occured while getting customers");
    }
  }, [allCustomersError]);

  useEffect(() => {
    fetchAllCustomers({
      page: 1,
      limit: 10
    });
  }, []);

  const onChange = (value) => {
    setStatus(value);
    fetchAllCustomers({ status: value, page: 1, limit: 10 });
  };

  return (
    <div className="card column-design">
      <div className="card-body">
        <h5>Customer List</h5>
        {list && (
          <div className="text-center m-2 d-flex justify-content-end">
            <div className="me-2" style={{ marginTop: "4px" }}>
              <CSVLink
                data={list}
                className="btn btn-dark btn-sm mb-1"
                filename="customer"
              >
                Download CSV
              </CSVLink>
            </div>
            <div>
              <Segmented
                className="text-center rounded danger"
                size="middle"
                options={[
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-lines-fill"></i> Active
                      </span>
                    ),
                    value: "true",
                  },
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-dash-fill"></i> Inactive
                      </span>
                    ),
                    value: "false",
                  },
                ]}
                value={status}
                onChange={onChange}
              />
            </div>
          </div>
        )}
        <CustomTable list={list} total={total} status={status} fetchAllCustomers={fetchAllCustomers} />
      </div>
    </div>
  );
};

export default GetAllCust;
