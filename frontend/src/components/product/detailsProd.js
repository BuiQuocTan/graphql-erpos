import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Popover, Row, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "../../redux/actions/product/deleteProductAction";
import { loadSingleProduct } from "../../redux/actions/product/detailProductAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { useMutation, useLazyQuery } from "@apollo/client";
import { DELETE_PRODUCT_MUTATION } from "../../mutations/product.mutation";
import { GET_ONEPRODUCT_QUERY } from "../../queries/product.query";

const DetailsProd = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  const [getOneProduct, { data: oneProductDetail, error: productError }] = useLazyQuery(GET_ONEPRODUCT_QUERY);
  const [deleteOneProduct, { data: deletedProduct, error: deleteProductError }] = useMutation(DELETE_PRODUCT_MUTATION);

  //Delete Product
  const onDelete = () => {
    try {
      deleteOneProduct({
        variables: { id: parseInt(id), status: false }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Product PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    if (oneProductDetail) {
      console.log("one product detail => ", oneProductDetail);
      dispatch(loadSingleProduct({ data: oneProductDetail.singleProductData }));
    }
  }, [oneProductDetail]);

  useEffect(() => {
    if (productError) {
      console.log("one product error => ", productError);
      toast.error("Error occured while getting product detail");
    }
  }, [productError]);

  useEffect(() => {
    if (deletedProduct && deletedProduct.deleteSingleProduct) {
      console.log(deletedProduct);

      dispatch(deleteProduct(parseInt(id)));
      setVisible(false);
      toast.warning(`Product : ${product.name} is removed `);
      return navigate("/product");
    }
  }, [deletedProduct]);

  useEffect(() => {
    if (deleteProductError) {
      console.log(deleteProductError);
      toast.error("Something went wrong");
    }
  }, [deleteProductError]);

  useEffect(() => {
    getOneProduct({
      variables: { id: parseInt(id) }
    });
  }, []);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Back  " />

      <div className="mr-top">
        {product ? (
          <Fragment key={product.id}>
            <Card bordered={false} className="card-custom">
              <div className="card-header d-flex justify-content-between m-3">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {product.id} | {product.name}
                  </span>
                </h5>
                <div className="text-end">
                  <Link
                    className="m-2"
                    to={`/product/${product.id}/update`}
                    state={{ data: product }}>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}></Button>
                  </Link>
                  <Popover
                    className="m-2"
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Yes Please !
                        </Button>
                      </a>
                    }
                    title="Are you sure you want to delete ?"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}>
                    <Button
                      type="danger"
                      shape="round"
                      icon={<DeleteOutlined />}></Button>
                  </Popover>
                </div>
              </div>
              <Row className="d-flex justify-content-between">
                <Col xs={24} xl={8}>
                  <div className="card-body ms-3">
                    <h5> Product Information :</h5>
                    <p>
                      <Typography.Text strong>Quantity :</Typography.Text>{" "}
                      {product.quantity}
                    </p>

                    <p>
                      <Typography.Text strong>Purchase Price :</Typography.Text>{" "}
                      {product.purchase_price}
                    </p>

                    <p>
                      <Typography.Text strong>Sale Price :</Typography.Text>{" "}
                      {product.sale_price}
                    </p>
                    <p>
                      <Typography.Text strong>Unit Type :</Typography.Text>{" "}
                      {product.unit_type}
                    </p>
                  </div>
                </Col>

                <Col xs={24} xl={8}>
                  <div className="card-body ms-3">
                    <Image
                      width={300}
                      className="fluid"
                      src={product.imageUrl}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsProd;
