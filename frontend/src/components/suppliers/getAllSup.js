import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadSuppliers } from "../../redux/actions/supplier/getSuppliersAction";
import "./suppliers.css";

import { useLazyQuery } from "@apollo/client";
import { GET_ALLSUPPLIER_QUERY } from "../../queries/supplier.query";
import { toast } from "react-toastify";

function CustomTable({ list, total, status, fetchAllSuppliers }) {
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
      render: (name, { id }) => <Link to={`/supplier/${id}`}>{name}</Link>,
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
              fetchAllSuppliers({ page, limit, status });
            },
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}

const GetAllSup = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.suppliers.list);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("true");

  const [getAllSuppliers, { data: allSuppliersInfo, error: allSuppliersError }] = useLazyQuery(GET_ALLSUPPLIER_QUERY);

  const fetchAllSuppliers = useCallback(props => {
    getAllSuppliers({
      variables: props
    })
  });

  useEffect(() => {
    if (allSuppliersInfo) {
      console.log("all suppliers info", allSuppliersInfo);
      const { allSuppliersData } = allSuppliersInfo;
      const { allSuppliers, aggregations } = allSuppliersData;

      if (allSuppliers) {
        dispatch(loadSuppliers(allSuppliers));
        fetchAllSuppliers({
          query: "info"
        })
      }

      if (aggregations)
        setTotal(aggregations._count.id)
    }
  }, [allSuppliersInfo]);

  useEffect(() => {
    if (allSuppliersError) {
      console.error("all suppliers error", allSuppliersError);
      toast.error("Error occured while getting all supplers");
    }
  }, [allSuppliersError]);

  useEffect(() => {
    fetchAllSuppliers({
      status: "true",
      page: 1,
      limit: 10
    });
  }, []);

  const onChange = (value) => {
    setStatus(value);
    // dispatch(loadSuppliers({ status: value, page: 1, limit: 10 }));
    getAllSuppliers({
      variables: {
        status: value, page: 1, limit: 10
      }
    })
  };

  return (
    <div className="card column-design">
      <div className="card-body">
        <h5>
          <i className="bi bi-card-list"> Suppliers List</i>
        </h5>
        {list && (
          <div className="card-title d-flex justify-content-end">
            <div className="me-2" style={{ marginTop: "4px" }}>
              <CSVLink
                data={list}
                className="btn btn-dark btn-sm mb-1"
                filename="suppliers"
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
        <CustomTable list={list} total={total} status={status} fetchAllSuppliers={fetchAllSuppliers} />
      </div>
    </div>
  );
};

export default GetAllSup;
