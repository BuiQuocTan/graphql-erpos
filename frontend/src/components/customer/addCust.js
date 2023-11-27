import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/actions/customer/addCustomerAciton";
import UploadMany from "../Card/UploadMany";
import styles from "./AddCust.module.css";

import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_MUTATION } from "../../mutations/customer.mutation"

const AddCust = () => {
	const dispatch = useDispatch();
	const { Title } = Typography;
	const [loading, setLoading] = useState(false);
	const onClick = () => {
		setLoading(true);
	};

	const [form] = Form.useForm();

	const [createCustomer, { data: createdCustomer, error: createdCustomerEror }] = useMutation(CREATE_CUSTOMER_MUTATION);

	useEffect(() => {
		if (createdCustomer) {
			console.log("created customer => ", createdCustomer);
			dispatch(addCustomer(createdCustomer.createCustomer));
			toast.success("Customer Added");
			form.resetFields();
			setLoading(false);
		}
	}, [createdCustomer]);

	useEffect(() => {
		if (createdCustomerEror) {
			console.log("created customer error => ", createdCustomerEror);
			toast.error("Error in adding customer try again");
			setLoading(false);
		}
	}, [createdCustomerEror]);

	const onFinish = async (values) => {
		createCustomer({
			variables: values
		});
	};

	const onFinishFailed = (errorInfo) => {
		setLoading(false);
		console.log("Failed:", errorInfo);
	};

	return (
		<Fragment>
			<Row className='mr-top' justify='space-between' gutter={[0, 30]}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='rounded column-design'>
					<Card bordered={false}>
						<Title level={4} className='m-2 text-center'>
							Add Customer
						</Title>
						<Form
							form={form}
							name='basic'
							labelCol={{
								span: 7,
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
							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Name'
								name='name'
								rules={[
									{
										required: true,
										message: "Please input customer name!",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Phone'
								name='phone'
								rules={[
									{
										required: true,
										message: "Please input customer Phone!",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Address'
								name='address'
								rules={[
									{
										required: true,
										message: "Please input customer Address!",
									},
								]}>
								<Input />
							</Form.Item>

							{/* Customer due droped */}

							<Form.Item
								style={{ marginBottom: "10px" }}
								className={styles.addCustomerBtnContainer}>
								<Button
									loading={loading}
									onClick={onClick}
									type='primary'
									htmlType='submit'
									shape='round'>
									Add Customer
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='column-design rounded'>
					<Card bordered={false} className={styles.importCsvCard}>
						<Title level={4} className='m-2 text-center'>
							Import From CSV
						</Title>
						<UploadMany urlPath={"customer"} />
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddCust;
