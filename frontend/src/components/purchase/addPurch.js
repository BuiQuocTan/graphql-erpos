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
	Typography,
} from "antd";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { addPurchase } from "../../redux/actions/purchase/addPurchaseAction";
import { loadSuppliers } from "../../redux/actions/supplier/getSuppliersAction";
import Products from "./Products";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSupplier } from "../../redux/actions/supplier/detailSupplierAction";

import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ALLPRODUCT_QUERY } from "../../queries/product.query";
import { GET_ALLSUPPLIER_QUERY } from "../../queries/supplier.query";
import { CREATE_PURCHASE_MUTATION } from "../../mutations/purchase.mutation";

const { Title } = Typography;

const AddPurch = () => {
	const { Option } = Select;
	const [formData, setFormData] = useState({});
	const [date, setDate] = useState(moment());
	const [afterDiscount, setAfterDiscount] = useState(0);
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const allSuppliers = useSelector((state) => state.suppliers.list);
	const allProducts = useSelector((state) => state.products.list);
	const [supplier, setSupplier] = useState(null);

	const onSearch = (value) => { };

	// Products Handlers

	const [selectedProds, setSelectedProds] = useState([]);

	// Form Function
	const [form] = Form.useForm();
	const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
		total: 0,
		discount: 0,
		afterDiscount: 0,
		paid: 0,
		due: 0,
	});

	const [getAllSuppliers, { data: allSuppliersInfo, error: allSuppliersError }] = useLazyQuery(GET_ALLSUPPLIER_QUERY);
	const [getAllProducts, { data: allProductsInfo, error: allProductsError }] = useLazyQuery(GET_ALLPRODUCT_QUERY);
	const [createPurchase, { data: createdPurchase, error: createdPurchaseError }] = useMutation(CREATE_PURCHASE_MUTATION);

	const fetchAllSuppliers = useCallback((props) => {
		getAllSuppliers({
			variables: props
		});
	});

	useEffect(() => {
		if (allSuppliersInfo) {
			console.log("all suppliers info => ", allSuppliersInfo);
			dispatch(loadSuppliers(allSuppliersInfo.allSuppliersData.allSuppliers));
		}
	}, [allSuppliersInfo]);

	useEffect(() => {
		if (allSuppliersError) {
			console.log("all suppliers error => ", allSuppliersError);
			toast.error("Something went wrong while getting suppliers");
		}
	}, [allSuppliersError]);

	const fetchAllProducts = useCallback((props) => {
		getAllProducts({
			variables: props
		})
	});

	useEffect(() => {
		if (allProductsInfo && allProductsInfo.allProductsData) {
			console.log("all products => ", allProductsInfo.allProductsData)
			const { allProductsData } = allProductsInfo;
			const { allProducts } = allProductsData;

			if (allProducts !== null) {
				dispatch(loadProduct(allProducts));
			}
		}
	}, [allProductsInfo]);

	useEffect(() => {
		if (allProductsError) {
			console.log("all products error => ", allProductsError);
			toast.error("Something went wrong while getting products");
		}
	}, [allProductsError]);

	useEffect(() => {
		if (createdPurchase) {
			console.log("created purchase => ", createdPurchase.createSinglePurchaseInvoice);

			dispatch(addPurchase(createdPurchase.createSinglePurchaseInvoice));
			toast.success("New Product Purchased ");

			form.resetFields();
			setFormData({});
			setAfterDiscount(0);
			setLoader(false);
			navigate(`/purchase/${createdPurchase.createSinglePurchaseInvoice.id}`);
		}
	}, [createdPurchase]);

	useEffect(() => {
		if (createdPurchaseError) {
			console.log("created purchase error => ", createdPurchaseError);
			toast.error("Error occured during purchasing ");
			setLoader(false);
		}
	}, [createdPurchaseError])

	useEffect(() => {
		fetchAllSuppliers({ status: "true", page: 1, limit: 10 });
		fetchAllProducts({ page: 1, limit: 10 });
	}, []);

	const onClickLoading = () => {
		setLoader(true);
	};

	const onFinish = async (values) => {
		const purchaseInvoiceProduct = selectedProds.map((prod) => {
			return {
				product_id: prod.id,
				product_quantity: prod.selectedQty,
				product_purchase_price: prod.purchase_price,
			};
		});

		createPurchase({
			variables: {
				purchaseInvoiceProduct,
				date: date,
				discount: totalDiscountPaidDue.discount,
				paid_amount: totalDiscountPaidDue.paid,
				supplier_id: supplier,
				note: values.note,
				supplier_memo_no: values.supplier_memo_no
			}
		});
	};

	const updateFormData = (e) => {
		const data = form.getFieldsValue();

		const total = data.purchaseInvoiceProduct?.reduce((acc, p) => {
			const { product_quantity = 0, product_purchase_price = 0 } = p;
			acc += product_quantity * product_purchase_price;
			return acc;
		}, 0);

		data.total = total;
		data.due = total - (data.paid_amount ?? 0) - (data.discount ?? 0);

		setFormData(data);
		if (data.discount) {
			setAfterDiscount(total - (data.discount ?? 0));
		}
		if (data.discount == 0) {
			setAfterDiscount(0);
		}
	};

	// Select Supplier Funciton
	const onChange = () => {
		updateFormData();
	};

	const onSelectChange = async (value) => {
		// updateFormData();
		// const { data } = await dispatch(loadSupplier(value));
		// setSupplier(data);
	};

	const handleSelectedProds = (prodId, key) => {
		const foundProd = allProducts.find((item) => item.id === prodId);
		// if (foundProd === undefined) {
		let updatedSelectedProds = [...selectedProds];
		if (selectedProds[key]) {
			updatedSelectedProds[key] = { ...foundProd, selectedQty: 1 };
			setSelectedProds(updatedSelectedProds);
		} else {
			setSelectedProds((prev) => [...prev, { ...foundProd, selectedQty: 1 }]);
		}
	};

	const handleSelectedProdsQty = (key, qty) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, selectedQty: qty };
			} else prodCopy = { ...prod };

			return prodCopy;
		});
		setSelectedProds(updatedSelectedProds);
	};

	const handleSelectedProdsPurchasePrice = (key, purchasePrice) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, purchase_price: purchasePrice };
			} else prodCopy = { ...prod };

			return prodCopy;
		});
		setSelectedProds(updatedSelectedProds);
	};

	const handleDeleteProd = (key) => {
		if (selectedProds[key]) {
			const updatedProds = selectedProds.filter((prod, index) => key !== index);
			setSelectedProds(updatedProds);
		}
	};

	const handleDiscount = (discountAmount) => {
		const afterDiscount = totalDiscountPaidDue.total - discountAmount;
		let dueAmount = totalDiscountPaidDue.total - discountAmount;
		if (totalDiscountPaidDue.paid > 0) {
			dueAmount = dueAmount - totalDiscountPaidDue.paid;
		}
		setTotalDiscountPaidDue((prev) => ({
			...prev,
			discount: discountAmount,
			due: dueAmount,
			afterDiscount,
		}));
	};

	const handlePaid = (paidAmount) => {
		const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
		setTotalDiscountPaidDue((prev) => ({
			...prev,
			paid: paidAmount,
			due: dueAmount,
		}));
	};

	useEffect(() => {
		if (selectedProds.length > 0) {
			let total = 0;
			let afterDiscount = 0;
			let due = 0;

			selectedProds.forEach((prod) => {
				total += prod.purchase_price * prod.selectedQty;
			});

			if (totalDiscountPaidDue.discount > 0) {
				afterDiscount = total - totalDiscountPaidDue.discount;
			} else afterDiscount = total;

			if (totalDiscountPaidDue.paid > 0) {
				due = afterDiscount - totalDiscountPaidDue.paid;
			} else due = afterDiscount;

			setTotalDiscountPaidDue((prev) => ({
				...prev,
				total,
				afterDiscount,
				due,
			}));
		}
	}, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);

	return (
		<Card className='mt-3'>
			<Form
				form={form}
				className='m-lg-4'
				name='dynamic_form_nest_item'
				// onFinish={onFinish}
				onFinish={onFinish}
				onFinishFailed={() => {
					setLoader(false);
				}}
				// onChange={onChange}
				layout='vertical'
				size='large'
				autoComplete='off'>
				<Row className='mr-top' gutter={[24, 24]}>
					<Col span={24} className='border rounded column-design'>
						<Title level={4} className='m-2 text-center'>
							Purchase New Products
						</Title>
					</Col>
					<Col span={24} lg={16}>
						<div className='d-flex justify-content-between mb-1'>
							<Form.Item
								label='Supplier '
								name='supplier_id'
								style={{ maxWidth: "250px" }}
								rules={[
									{
										required: true,
										message: "Please Select a supplier!",
									},
								]}>
								<Select
									loading={!allSuppliers}
									showSearch
									placeholder='Select a supplier '
									optionFilterProp='children'
									onChange={(id) => setSupplier(id)}
									onSearch={onSearch}
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())
									}>
									{allSuppliers &&
										allSuppliers.map((sup) => (
											<Option key={sup.id} value={sup.id}>
												{sup.name}
											</Option>
										))}
								</Select>
							</Form.Item>
							<Form.Item label='Date' required>
								<DatePicker
									onChange={(value) => setDate(value._d)}
									defaultValue={date}
									format={"YYYY-MM-DD"}
									style={{ marginBottom: "10px", paddingTop: "10px" }}
									className='date-picker'
									label='date'
									name='date'
									rules={[
										{
											required: true,
											message: "Please input Date!",
										},
									]}
								/>
							</Form.Item>
						</div>
						<div className='d-flex justify-content-between mb-1'>
							<Form.Item name='supplier_memo_no' label='Supplier Memo'>
								<Input placeholder='Memo no ' onChange={updateFormData} />
							</Form.Item>

							<Form.Item name='note' label='note'>
								<Input placeholder='Note' onChange={updateFormData} />
							</Form.Item>
						</div>

						<Products
							formData={formData}
							setData={setFormData}
							allProducts={allProducts}
							// updateFormData={updateFormData}
							selectedProds={selectedProds}
							handleSelectedProds={handleSelectedProds}
							handleSelectedProdsQty={handleSelectedProdsQty}
							handleSelectedProdsPurchasePrice={
								handleSelectedProdsPurchasePrice
							}
							handleDeleteProd={handleDeleteProd}
						/>
					</Col>

					<Col span={24} lg={8}>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}>
							<strong>Total: </strong>
							<strong>{totalDiscountPaidDue.total} tk</strong>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<div>
								<strong>Discount: </strong>
							</div>

							<Form.Item
								style={{ maxWidth: "200px" }}
								name='discount'
								rules={[
									{
										required: true,
										message: "Please input Discount!",
									},
								]}>
								<InputNumber type='number' onChange={handleDiscount} />
							</Form.Item>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
							}}>
							<div>
								<strong>After Discount: </strong>
							</div>
							<strong>{totalDiscountPaidDue.afterDiscount} tk</strong>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<div>
								<strong>Paid Amount: </strong>
							</div>
							<Form.Item
								name='paid_amount'
								style={{ maxWidth: "200px" }}
								rules={[
									{
										required: true,
										message: "Please input Paid amount!",
									},
								]}>
								<InputNumber type='number' onChange={handlePaid} />
							</Form.Item>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
								marginBottom: "10px",
							}}>
							<strong>Due Amount: </strong>
							<strong>{totalDiscountPaidDue.due} tk</strong>
						</div>

						<Form.Item style={{ marginTop: "15px" }}>
							<Button
								block
								type='primary'
								htmlType='submit'
								loading={loader}
								onClick={onClickLoading}>
								Purchase Product
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default AddPurch;
