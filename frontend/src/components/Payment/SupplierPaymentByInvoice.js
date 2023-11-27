import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Typography,
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSupplierPayment } from "../../redux/actions/supplierPayment/addSupplierPaymentAction";
import PageTitle from "../page-header/PageHeader";

import { useMutation } from "@apollo/client";
import { CREATE_PAYNENTPURCHASEINVOICE_MUTATION } from "../../mutations/paymentPurchaseInvoice.mutation";

const AddSupPaymentByInvoice = () => {
	const navigate = useNavigate();

	const { pid } = useParams();

	const dispatch = useDispatch();
	const { Title } = Typography;

	const [form] = Form.useForm();

	let [date, setDate] = useState(moment());
	const [loader, setLoader] = useState(false);

	const [createPaymentPurchaseInvoice, { data: createdPaymentPurchaseInvoice, error: createPaymentPurchaseInvoiceError }] = useMutation(CREATE_PAYNENTPURCHASEINVOICE_MUTATION);

	useEffect(() => {
		if (createdPaymentPurchaseInvoice && createdPaymentPurchaseInvoice.createPaymentPurchaseInvoice) {
			console.log("created payment purchase invoice => ", createdPaymentPurchaseInvoice);
			setLoader(false);
			toast.success("Payment Successfully done");
			navigate(-1);
			form.resetFields();

			dispatch(addSupplierPayment(createdPaymentPurchaseInvoice.createPaymentPurchaseInvoice))
		}
	}, [createdPaymentPurchaseInvoice]);

	useEffect(() => {
		if (createPaymentPurchaseInvoiceError) {
			console.log("create payment purchase invoice error => ", createPaymentPurchaseInvoiceError);
			setLoader(false);
		}
	}, [createPaymentPurchaseInvoiceError]);

	const onFinish = async (values) => {
		try {
			createPaymentPurchaseInvoice({
				variables: {
					date: date._d.toString(),
					amount: parseFloat(values.amount),
					discount: parseFloat(values.discount),
					purchase_invoice_no: parseInt(values.purchase_invoice_no)
				}
			})
		} catch (e) {
			console.log(e);
			setLoader(false);
			toast.error("something went wrong");
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoader(false);
		toast.error("something went wrong");
	};

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<>
			<PageTitle title='Back' />
			<Row className='mr-top'>
				<Col
					xs={24}
					sm={24}
					md={12}
					lg={12}
					xl={14}
					className='border rounded column-design'>
					<Card bordered={false} className='criclebox h-full'>
						<Title level={3} className='m-3 text-center'>
							Purchase Invoice Payment
						</Title>
						<Form
							form={form}
							className='m-4'
							name='basic'
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
							autoComplete='off'>
							<Form.Item label='Date' required>
								<DatePicker
									defaultValue={moment()}
									onChange={(value) => setDate(value?._d)}
									style={{ marginBottom: "10px" }}
									label='date'
									name='date'
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
								label='Discount'
								name='discount'
								rules={[
									{
										required: true,
										message: "Please input discount!",
									},
								]}>
								<Input type="number" />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Amount'
								name='amount'
								rules={[
									{
										required: true,
										message: "Please input amount!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item
								hasFeedback
								validateStatus='success'
								initialValue={pid}
								style={{ marginBottom: "10px" }}
								label='Purchase Invoice No'
								name='purchase_invoice_no'
								rules={[
									{
										required: true,
										message: "Please input Invoice No!",
									},
								]}>
								<Input type='number' disabled col />
							</Form.Item>
							{/* 
              <Form.Item
                style={{ marginBottom: "10px" }}
                label='Particulars'
                name='particulars'
                rules={[
                  {
                    required: true,
                    message: "Please input particulars!",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 8,
									span: 16,
								}}>
								<Button
									block
									type='primary'
									htmlType='submit'
									shape='round'
									loading={loader}
									onClick={() => setLoader(true)}>
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

export default AddSupPaymentByInvoice;
