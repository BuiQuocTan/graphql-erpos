import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	InputNumber,
	Row,
	Select,
	Typography,
} from "antd";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Products from "./Products";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";
import { loadProduct } from "../../redux/actions/product/getAllProductAction"
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALLSALEINVOICE_QUERY } from "../../queries/saleInvoice.query";
import { GET_ALLUSERS_QUERY } from "../../queries/user.query";
import { GET_ALLCUSTOMERS_QUERY } from "../../queries/customer.query";
import { GET_ALLPRODUCT_QUERY } from "../../queries/product.query";
import { CREARTE_SALEINVOICE_MUTATION } from "../../mutations/saleInvoice.mutation";

const { Title } = Typography;

const AddSale = () => {
	const { Option } = Select;
	const [formData, setFormData] = useState({});
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();

	const [date, setDate] = useState(moment());
	const [afterDiscount, setAfterDiscount] = useState(0);
	const allCustomer = useSelector((state) => state.customers.list);
	const allProducts = useSelector((state) => state.products.list);
	const allStaff = useSelector((state) => state.users.list);
	const dispatch = useDispatch();

	const [getAllSaleInvoice, { data: allSaleInvoiceData, error: allSaleInvoiceError }] = useLazyQuery(GET_ALLSALEINVOICE_QUERY);
	const [getAllUsers, { data: allUsersData, error: allUserseError }] = useLazyQuery(GET_ALLUSERS_QUERY);
	const [getAllCustomers, { data: allCustomersInfo, error: allCustomersError }] = useLazyQuery(GET_ALLCUSTOMERS_QUERY);
	const [getAllProducts, { data: allProductsInfo, error: allProductsError }] = useLazyQuery(GET_ALLPRODUCT_QUERY);
	const [createSaleInvoice, { data: createdSaleInvoice, error: createSaleInvoiceError }] = useMutation(CREARTE_SALEINVOICE_MUTATION);

	const fetchAllSaleInvoice = useCallback((props) => {
		getAllSaleInvoice({
			variables: props
		})
	});

	const fetchAllUsers = useCallback((props) => {
		getAllUsers({
			variables: props
		})
	});

	const fetchAllCustomers = useCallback((props) => {
		getAllCustomers({
			variables: props
		})
	});

	const fectchAllProducts = useCallback((props) => {
		getAllProducts({
			variables: props
		})
	});

	useEffect(() => {
		if (allUsersData) {
			console.log(allUsersData);
			dispatch(loadAllStaff(allUsersData.getAllUsers))
		}
	}, [allUsersData]);

	useEffect(() => {
		if (allUserseError) {
			console.log("all users => ", allUserseError);
			toast.error("Error occured while getting all users");
		}
	}, [allUserseError]);

	useEffect(() => {
		if (allSaleInvoiceData) {
			console.log(allSaleInvoiceData);
			dispatch(loadAllSale(allSaleInvoiceData.allSaleInvoiceData));
		}
	}, [allSaleInvoiceData]);

	useEffect(() => {
		if (allSaleInvoiceError) {
			console.log("all sale invoice error =>", allSaleInvoiceError);
			toast.error("Error occured while getting all sale invoice");
		}
	}, [allSaleInvoiceError]);

	useEffect(() => {
		if (allProductsInfo) {
			console.log("all products info => ", allProductsInfo);
			dispatch(loadProduct(allProductsInfo.allProductsData.allProducts));
		}
	}, [allProductsInfo]);

	useEffect(() => {
		if (allProductsError) {
			console.log("all products error => ", allProductsError);
			toast.error("Error occured while getting products");
		}
	}, [allProductsError])

	useEffect(() => {
		if (allCustomersInfo) {
			console.log(allCustomersInfo.getAllCustomers);
			if (allCustomersInfo.getAllCustomers.allCustomers)
				dispatch(loadAllCustomer(allCustomersInfo.getAllCustomers.allCustomers))
		}
	}, [allCustomersInfo]);

	useEffect(() => {
		if (allCustomersError) {
			console.log("all customers error => ", allCustomersError);
			toast.error("Error occured while getting customers");
		}
	}, [allCustomersError]);

	useEffect(() => {
		if (createdSaleInvoice && createdSaleInvoice.createSingleSaleInvoice) {
			console.log("created sale invoice => ", createdSaleInvoice);
			dispatch(addSale(createdSaleInvoice.createSingleSaleInvoice));

			form.resetFields();
			setFormData({});
			setAfterDiscount(0);
			setLoader(false);
			fetchAllSaleInvoice({
				page: 1,
				startdate: moment().format("YYYY-MM-DD"),
				enddate: moment().format("YYYY-MM-DD"),
			})
			navigate(`/sale/${createdSaleInvoice.createSingleSaleInvoice.id}`);

			toast.success("Product has been sold")
		}
	}, [createdSaleInvoice]);

	useEffect(() => {
		if (createSaleInvoiceError) {
			console.log("create sale invoice error => ", createSaleInvoiceError);
			toast("Something went wromg");
		}
	}, [createSaleInvoiceError])

	const onClickLoading = () => {
		setLoader(true);
	};

	useEffect(() => {
		fetchAllUsers({
			status: "true"
		});
		fetchAllCustomers({
			page: 1, limit: 10
		});
		fectchAllProducts({
			page: 1, limit: 10
		})
	}, []);

	const [customer, setCustomer] = useState(null);
	const [salesPerson, setSalesPerson] = useState(null);

	// Form Function
	const [form] = Form.useForm();
	const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
		total: 0,
		discount: 0,
		afterDiscount: 0,
		paid: 0,
		due: 0,
	});

	const onFormSubmit = async (values) => {
		const saleInvoiceProduct = selectedProds.map((prod) => {
			return {
				product_id: parseInt(prod.id),
				product_quantity: parseInt(prod.selectedQty),
				product_sale_price: parseFloat(prod.sale_price),
			};
		});

		try {
			const valueData = {
				date: date._d.toString(),
				paid_amount: parseFloat(totalDiscountPaidDue.paid),
				discount: parseFloat(totalDiscountPaidDue.discount),
				customer_id: parseInt(customer),
				user_id: parseInt(salesPerson),
				saleInvoiceProduct,
			};

			createSaleInvoice({
				variables: valueData
			});
		} catch (error) {
			console.log(error.message);
			setLoader(false);
			toast.error("Error while sales");
		}
	};

	const updateFormData = () => {
		const data = form.getFieldsValue();

		const total = data.saleInvoiceProduct?.reduce((acc, p) => {
			const { product_quantity = 0, product_sale_price = 0 } = p;
			acc += product_quantity * product_sale_price;
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
	const onChange = async (values) => {
		updateFormData();
	};

	const onSearch = (value) => { };

	// Products Handlers

	const [selectedProds, setSelectedProds] = useState([]);

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

		// }
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

	const handleSelectedProdsSalePrice = (key, salePrice) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, sale_price: salePrice };
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
				total += prod.sale_price * prod.selectedQty;
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
				onChange={onChange}
				onFinishFailed={() => {
					setLoader(false);
				}}
				layout='vertical'
				size='large'
				autoComplete='off'>
				<Row className='mr-top' gutter={[24, 24]}>
					<Col span={24} className='border rounded column-design'>
						<Title level={4} className='m-2 text-center'>
							Sale New Products
						</Title>
					</Col>
					<Col span={24} lg={16}>
						<div className='d-flex justify-content-between mb-1'>
							<Form.Item
								label='Customer '
								name='customer_id'
								style={{ maxWidth: "250px" }}
								rules={[
									{
										required: true,
										message: "Please Select a Customer!",
									},
								]}>
								<Select
									loading={!allCustomer}
									showSearch
									placeholder='Select a customer '
									optionFilterProp='children'
									onChange={(id) => setCustomer(id)}
									onSearch={onSearch}
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())
									}>
									{allCustomer &&
										allCustomer.map((sup) => (
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
									style={{ marginBottom: "10px" }}
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

							{/* Sales Person Input Field */}
							<Form.Item
								label='Sales Person '
								name='sales_person_id'
								style={{ maxWidth: "250px" }}
								rules={[
									{
										required: true,
										message: "Please Select a sales person!",
									},
								]}>
								<Select
									loading={!allStaff}
									showSearch
									placeholder='Select sales person '
									optionFilterProp='children'
									onChange={(id) => setSalesPerson(id)}
									onSearch={onSearch}
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())
									}>
									{allStaff &&
										allStaff?.map((info) => (
											<Option key={info.id} value={info.id}>
												{info.username}
											</Option>
										))}
								</Select>
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
							handleSelectedProdsSalePrice={handleSelectedProdsSalePrice}
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
							<strong>Discount: </strong>
							<Form.Item
								name='discount'
								rules={[
									{
										required: true,
										message: "Please input discount!",
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
							<strong>After Discount: </strong>
							<strong>{totalDiscountPaidDue.afterDiscount} tk</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<strong>Paid Amount: </strong>
							<Form.Item
								name='paid_amount'
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
								onClick={() => {
									onClickLoading();
									onFormSubmit();
								}}>
								Sale Product
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default AddSale;
