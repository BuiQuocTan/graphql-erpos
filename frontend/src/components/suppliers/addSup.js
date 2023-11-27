import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSupplier } from "../../redux/actions/supplier/addSupplierAction";
import UploadMany from "../Card/UploadMany";
import styles from "./AddSup.module.css";
import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import { CREATE_SUPPLIER_MUTATION } from "../../mutations/supplier.mutation";

const AddSup = () => {
	const dispatch = useDispatch();
	const { Title } = Typography;

	// create a state for button loading and a function to set the value true onClick of the button
	const [loading, setLoading] = useState(false);
	const onClick = () => {
		setLoading(true);
	};

	const [form] = Form.useForm();

	const [createOneSuppler, { data: createdSupplier, error: createdSupplierError }] = useMutation(CREATE_SUPPLIER_MUTATION);

	useEffect(() => {
		if (createdSupplier && createdSupplier.createSingleSupplier) {
			console.log("created suplier => ", createdSupplier);
			dispatch(addSupplier(createdSupplier.createSingleSupplier));
			setLoading(false);
			form.resetFields();
			toast.success("New supplier has been created");
		}
	}, [createdSupplier]);

	useEffect(() => {
		if (createdSupplierError) {
			console.log("created supplier error => ", createdSupplierError);
			setLoading(false);
			toast.error("Something went wrong");
		}
	}, [createdSupplierError]);

	const onFinish = async (values) => {
		createOneSuppler({
			variables: {
				name: values.name,
				phone: values.phone,
				address: values.phone
			}
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
							Add Supplier
						</Title>
						<Form
							form={form}
							name='basic'
							labelCol={{
								span: 7,
							}}
							labelWrap
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
										message: "Please input supplier name!",
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
										message: "Please input supplier Phone!",
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
										message: "Please input supplier Address!",
									},
								]}>
								<Input />
							</Form.Item>

							{/* //Due amount droped */}

							<Form.Item
								style={{ marginBottom: "10px" }}
								className={styles.addSupplierBtnContainer}>
								<Button
									loading={loading}
									onClick={onClick}
									type='primary'
									htmlType='submit'
									shape='round'>
									Add Supplier
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
					className='rounded column-design'>
					<Card bordered={false} className={styles.importCsvCard}>
						<Title level={4} className='m-2 text-center'>
							Import From CSV
						</Title>
						<UploadMany urlPath={"supplier"} />
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddSup;
