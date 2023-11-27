import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { toast } from "react-toastify";

import { Fragment, useEffect, useState } from "react";
import Loader from "../loader/loader";
import styles from "./AddDetails.module.css";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_SETTING_QUERY } from "../../queries/setting.query";
import { UPDATE_SETTING_MUTATION } from "../../mutations/setting.mutation";

const AddDetails = () => {
	const { Title } = Typography;
	const [loader, setLoader] = useState(false);

	const [form] = Form.useForm();

	const [initValues, setInitValues] = useState(null);

	const [getSetting, { data: settingInfo, error: settingError }] = useLazyQuery(GET_SETTING_QUERY);
	const [updateSetting, { data: updatedSettingInfo, error: updateSettingError }] = useMutation(UPDATE_SETTING_MUTATION);

	useEffect(() => {
		if (settingInfo) {
			console.log("settng info => ", settingInfo);
			setInitValues(settingInfo.getSetting);
		}
	}, [settingInfo]);

	useEffect(() => {
		if (settingError) {
			console.log("setting error => ", settingError);
			toast.error("Error occured while getting setting");
		}
	}, [settingError]);

	useEffect(() => {
		if (updatedSettingInfo) {
			console.log("updated setting info => ", updatedSettingInfo);
			toast.success("Setting Updated Successfully");
			setLoader(false);
		}
	}, [updatedSettingInfo]);

	useEffect(() => {
		if (updateSettingError) {
			console.log("update setting error => ", updateSettingError);
			toast.error("Something went wrong");
			setLoader(false);
		}
	}, [updateSettingError])

	const onFinish = async (values) => {
		updateSetting({
			variables: values
		});
	};

	const onFinishFailed = (errorInfo) => {
		toast.error("Something went wrong !");
		console.log("Failed:", errorInfo);
	};

	const onClickLoading = () => {
		setLoader(true);
	};

	useEffect(() => {
		getSetting();
	}, []);

	return (
		<Fragment>
			<Row className='mr-top' justify='center'>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='border rounded column-design'>
					<Card bordered={false}>
						<Title level={4} className='m-2 text-center'>
							Invoice Setting
						</Title>
						{initValues ? (
							<Form
								initialValues={{
									...initValues,
								}}
								form={form}
								name='basic'
								labelCol={{
									span: 7,
								}}
								labelWrap
								wrapperCol={{
									span: 16,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Company Name" }]}
									label='Company Name'
									name='company_name'
									rules={[
										{
											required: true,
											message: "Please input Company name!",
										},
									]}>
									<Input />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Tagline" }]}
									label='Tagline'
									name='tag_line'
									rules={[
										{
											required: true,
											message: "Please input Tagline!",
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
											message: "Please input Address!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Phone Number'
									name='phone'
									rules={[
										{
											required: true,
											message: "Please input Phone Number!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Email Address'
									name='email'
									rules={[
										{
											required: true,
											message: "Please input Email Address!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Website'
									name='website'
									rules={[
										{
											required: true,
											message: "Please input Website!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Footer'
									name='footer'
									rules={[
										{
											required: true,
											message: "Please input Footer!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									className={styles.addBtnContainer}>
									<Button
										type='primary'
										htmlType='submit'
										shape='round'
										loading={loader}
										onClick={onClickLoading}>
										Update Details
									</Button>
								</Form.Item>
							</Form>
						) : (
							<Loader />
						)}
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddDetails;
