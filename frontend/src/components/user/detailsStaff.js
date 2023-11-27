import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../redux/actions/user/detailUserAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { useMutation, useLazyQuery } from "@apollo/client";
import { DELETE_USER_MUTATION } from "../../mutations/user.mutation";
import { GET_ONEUSER_QUERY } from "../../queries/user.query";

//PopUp

const DetailStaff = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [deleteUser, { data: deletedUser, error: deleteUserError }] = useMutation(DELETE_USER_MUTATION);
  const [getOneUser, { data: oneUserData, error: oneUserError }] = useLazyQuery(GET_ONEUSER_QUERY);

  const fetchOneUser = useCallback((props) => {
    getOneUser({
      variables: props
    });
  }, [getOneUser]);

  useEffect(() => {
    if (oneUserData) {
      console.log("one user data => ", oneUserData);
      dispatch(loadSingleStaff({ data: oneUserData.getSingleUser }))
    }
  }, [oneUserData, dispatch]);

  useEffect(() => {
    if (oneUserError) {
      console.log("one user error => ", oneUserError);
      toast.error("Error occured while reading user data");
    }
  }, [oneUserError])

  useEffect(() => {
    if (deletedUser) {
      console.log("deleted user => ", deletedUser);
      setVisible(false);
      const { message, username } = deletedUser.deleteUser;
      if (message !== "OK") {
        toast.error(message);
        return;
      }
      toast.warning(`User Name : ${username} has been removed `);
      return navigate("/hr/staffs");
    }
  }, [deletedUser, navigate]);

  useEffect(() => {
    if (deleteUserError) {
      console.log("delete user error => ", deleteUserError);
      toast.error("something went wrong");
    }
  }, [deleteUserError])

  //Delete Supplier
  const onDelete = (e) => {
    e.preventDefault();
    deleteUser({
      variables: {
        id: parseInt(id),
        status: false
      }
    });
    setVisible(false);
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    fetchOneUser({
      id: parseInt(id)
    });
  }, [id, fetchOneUser]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <div>
      <PageTitle title=" Back  " />

      <div className="mr-top">
        {user ? (
          <Fragment key={user.id}>
            <Card bordered={false} className="card-custom">
              <div className="card-header d-flex justify-content-between m-3">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {user.id} | {user.username}
                  </span>
                </h5>
                <div className="text-end">
                  <Link
                    className="m-2"
                    to={`/hr/staffs/${user.id}/update`}
                    state={{ data: user }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    ></Button>
                  </Link>
                  <Popover
                    className="m-2"
                    content={
                      <a onClick={onDelete} href="/">
                        <Button type="primary" danger>
                          Yes Please !
                        </Button>
                      </a>
                    }
                    title="Are you sure you want to delete ?"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      shape="round"
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popover>
                </div>
              </div>
              <div className="card-body m-3">
                <p>
                  <Typography.Text strong>ID No :</Typography.Text> {user.id_no}
                </p>
                <p>
                  <Typography.Text strong>Role :</Typography.Text> {user.role}
                </p>
                <p>
                  <Typography.Text strong>email :</Typography.Text> {user.email}
                </p>
                <p>
                  <Typography.Text strong>salary :</Typography.Text>{" "}
                  {user.salary}
                </p>
                <p>
                  <Typography.Text strong>Designation ID :</Typography.Text>{" "}
                  {user.designation_id}
                </p>
                <p>
                  <Typography.Text strong>department :</Typography.Text>{" "}
                  {user.department}
                </p>
                <p>
                  <Typography.Text strong>phone :</Typography.Text> {user.phone}
                </p>
                <p>
                  <Typography.Text strong>address :</Typography.Text>{" "}
                  {user.address}
                </p>
                <p>
                  <Typography.Text strong>Blood Group :</Typography.Text>{" "}
                  {user.blood_group}
                </p>

                <p>
                  <Typography.Text strong>Joining Date</Typography.Text>{" "}
                  {moment(user.join_date).format("YYYY-MM-DD")}
                </p>

                <p>
                  <Typography.Text strong>Leave Date</Typography.Text>{" "}
                  {moment(user.leave_date).format("YYYY-MM-DD")}
                </p>
              </div>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailStaff;
