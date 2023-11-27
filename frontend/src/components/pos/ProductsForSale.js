import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
  Tag
} from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { loadSingleProductCategory } from "../../redux/actions/productCategory/detailProductCategoryAction";
import { loadAllProductCategory } from "../../redux/actions/productCategory/getProductCategoryAction";
import "./pos.css";

import { useLazyQuery } from "@apollo/client";
import { GET_ALLPRODUCT_QUERY } from "../../queries/product.query";
import { GET_ALLPRODUCTCATEGORY_QUERY, GET_ONEPRODUCTCATEGORY_QUERY } from "../../queries/productCategory.query";
import { toast } from "react-toastify";

export default function ProductsForSale({ handleSelectedProds }) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.products.list);
  const category = useSelector((state) => state.productCategories?.list);
  const [loading, setLoading] = useState(false);
  const [finalCat, setFinalCat] = useState([]);

  const [totalProd, setTotalProd] = useState(0);
  const [prodList, setProdList] = useState(null);

  const [getAllProducts, { data: allProductsInfo, error: allProductsError }] = useLazyQuery(GET_ALLPRODUCT_QUERY);
  const [getAllProductCategory, { data: allProductCategory, error: allProductCategoryError }] = useLazyQuery(GET_ALLPRODUCTCATEGORY_QUERY);
  const [getOneProductCategory, { data: oneProductCategory, error: oneProductCategoryError }] = useLazyQuery(GET_ONEPRODUCTCATEGORY_QUERY);

  const fetchAllProducts = useCallback((props) => {
    getAllProducts({
      variables: props
    })
  });

  useEffect(() => {
    if (allProductsInfo && allProductsInfo.allProductsData) {
      const { allProductsData } = allProductsInfo;
      const { allProducts, aggregations } = allProductsData;
      if (allProducts !== null) {
        console.log("all products => ", allProductsInfo.allProductsData);
        dispatch(loadProduct(allProducts));
        setProdList(allProducts);
        fetchAllProducts({ query: "info" });
      }
      if (aggregations !== null) {
        console.log("all products aggregations => ", aggregations);
        setTotalProd(aggregations._count.id);
      }
    }
  }, [allProductsInfo]);

  useEffect(() => {
    if (allProductsError)
      console.log(allProductsError)
  }, [allProductsError]);

  const fetchAllProductCategories = useCallback((props) => {
    getAllProductCategory({
      variables: props
    })
  });

  useEffect(() => {
    if (allProductCategory) {
      console.log("all products category => ", allProductCategory);
      dispatch(loadAllProductCategory(allProductCategory.allProductCategoryData));
    }
  }, [allProductCategory]);

  useEffect(() => {
    if (allProductCategoryError) {
      console.log("all products error => ", allProductCategoryError);
      toast.error("Error occured while getting products")
    }
  }, [allProductCategoryError]);

  const fetchOneProductCategory = useCallback((props) => {
    getOneProductCategory({ variables: props });
  });

  useEffect(() => {
    if (oneProductCategory) {
      console.log(oneProductCategory);
      dispatch(loadSingleProductCategory({ data: oneProductCategory.singleProductCategoryData }));
    }
  }, [oneProductCategory]);

  useEffect(() => {
    if (oneProductCategoryError) {
      console.log("product category error => ", oneProductCategoryError);
      toast.error("Error occured while getting a catagory");
    }
  }, [oneProductCategoryError])

  useEffect(() => {
    const categoryToGetAllProd = {
      id: 0,
      name: "all products",
    };
    if (category !== null) {
      setFinalCat([categoryToGetAllProd, ...category]);
    }
  }, [category]);

  const categoryProd = useSelector(
    (state) => state.productCategories?.category?.product
  );

  useEffect(() => {
    fetchAllProducts({
      status: "true", page: 1, limit: 10
    });

    fetchAllProductCategories({
      page: 1, limit: 100
    })
  }, []);

  const handleCatChange = (catId) => {
    console.log(catId, typeof (catId))
    if (catId === 0) {
      fetchAllProducts({ page: 1, limit: 10 });
    } else {
      fetchAllProducts({ query: "for", prod: catId + "" });
    }
  };

  const [status, setStatus] = useState("true");

  const onShowSizeChange = (current, pageSize) => { };

  const Products = ({ item, index }) => {
    return (
      <Col span={24} sm={12} xl={8} key={index}>
        <Card
          hoverable
          style={{
            width: "100%",
          }}
          className="pos-product-card"
          onClick={() => {
            handleSelectedProds(item);
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <div className="w-50" style={{ maxWidth: "5rem" }}>
              <img
                alt="example"
                src={item.imageUrl}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="w-50 flex-grow-1">
              <p className="font-weight-bold mb-0">{item.name}</p>
              <p className="mb-0"> Sale Price : {item.sale_price}</p>
              <p> Stock : {item.quantity}</p>
            </div>
            <br />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Tag>SKU : {item.sku}</Tag>
          </div>
        </Card>
      </Col>
    );
  };

  // Single Product Search Function
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(false);
    if (values.s_id) {
      fetchAllProducts({ query: "search", prod: values.s_id });
    } else {
      fetchAllProducts({ status: "true", page: 1, limit: 10 });

    }
  };
  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="d-flex justify-content-around">
        <div className="mt-2">
          <Form
            form={form}
            layout="inline"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Search" name="s_id">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button
                loading={loading}
                onClick={() => setLoading(true)}
                className="ant-btn-new"
                type="primary"
                size="small"
                htmlType="submit"
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-2">
          <Select
            name="product_category_id"
            loading={!category}
            showSearch
            style={{
              width: 200,
            }}
            onChange={handleCatChange}
            placeholder="Select Category"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {finalCat &&
              finalCat.map((cate) => (
                <Select.Option key={cate.id} value={cate.id}>
                  {cate.name}
                </Select.Option>
              ))}
          </Select>
        </div>
      </div>
      <Row className="mt-2" gutter={[20, 20]}>
        {prodList ? (
          prodList.map((item, index) => (
            <Products key={index} index={index} item={item} />
          ))
        ) : categoryProd ? (
          categoryProd.map((item, index) => (
            <Products key={index} index={index} item={item} />
          ))
        ) : (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Spin size="large" />
          </div>
        )}
      </Row>

      {totalProd > 0 && (
        <div className="mt-3">
          <Pagination
            showSizeChanger
            onChange={(page, limit) => {
              fetchAllProducts({ page, limit, status });
            }}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalProd}
          />
        </div>
      )}
    </>
  );
}
