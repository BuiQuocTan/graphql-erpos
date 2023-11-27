import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

import { useMutation } from "@apollo/client";
import { UPDATE_DESCIGNATION_MUTATION } from "../../mutations/designaton.mutation";

function UpdateDesignation() {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const [success, setSuccess] = useState(false);
	const { id } = useParams();

	//Loading Old data from URL
	const location = useLocation();
	const { data } = location.state;

	const cust = data;
	const [initValues, setInitValues] = useState({
		name: cust.name,
		phone: cust.phone,
		address: cust.address,
		due_amount: cust.due_amount,
	});

	const [updateDesignation, { data: updatedDesignation, error: updateDesignationError }] = useMutation(UPDATE_DESCIGNATION_MUTATION);

	useEffect(() => {
		if (updatedDesignation) {
			console.log("updated designation => ", updatedDesignation);
			setSuccess(true);
			toast.success("Designation details is updated");
			setInitValues({});
		}
	}, [updatedDesignation]);

	useEffect(() => {
		if (updateDesignationError) {
			console.log("update designation error => ", updateDesignationError);
			setSuccess(false);
			toast.error("Error occured while updating designation");
		}
	}, [updateDesignationError]);

	const onFinish = (values) => {
		updateDesignation({
			variables: { id: parseInt(id), name: values.name }
		});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<>
			<PageTitle title={`back`} />
			<div className='text-center'>
				<Card className='mt-2'>
					<Row className='mr-top'>
						<Col
							xs={24}
							sm={24}
							md={24}
							lg={10}
							xl={10}
							className='border rounded column-design'>
							{success && (
								<div>
									<Alert
										message={`Designation details updated successfully`}
										type='success'
										closable={true}
										showIcon
									/>
								</div>
							)}
							<Title level={3} className='m-3 text-center'>
								Edit Designation Form
							</Title>
							<Form
								initialValues={{
									...initValues,
								}}
								form={form}
								className='m-4'
								name='basic'
								labelCol={{
									span: 8,
								}}
								wrapperCol={{
									span: 16,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Name" }]}
									label='Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Please input Designation name!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									wrapperCol={{
										offset: 8,
										span: 16,
									}}>
									<Button block type='primary' htmlType='submit' shape='round'>
										Update Now
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Card>
			</div>
		</>
	);
}

export default UpdateDesignation;
