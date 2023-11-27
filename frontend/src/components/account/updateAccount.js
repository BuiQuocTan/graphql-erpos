import { Button, Form, Input, Modal, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALLACCOUNTS_QUERY } from "../../queries/account.query";
import { UPDATE_ACCOUNT_MUTATION } from "../../mutations/account.mutation";

const UpdateAccount = ({ account, id }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [accounts, setAccounts] = useState(null);
	const [initValues, setInitValues] = useState({
		name: account,
	});

	const [getAllAccounts, { data: allAccounts, error: getAccountsError }] = useLazyQuery(GET_ALLACCOUNTS_QUERY);
	const [updateAccount, { data: updatedAccount, error: updateAccountError }] = useMutation(UPDATE_ACCOUNT_MUTATION);

	useEffect(() => {
		if (updatedAccount) {
			console.log("updated account => ", updatedAccount);
			form.resetFields();
			setInitValues({});
			setLoading(false);
			setOpen(false);
			navigate(`/account`);
			toast.success("Account Updated");
		}
	}, [updatedAccount]);

	useEffect(() => {
		if (updateAccountError) {
			console.log("create account error => ", updateAccountError);
			toast.error("Something went wrong");
			setLoading(false);
		}
	}, [updateAccountError]);

	useEffect(() => {
		if (allAccounts) {
			console.log("all accounts => ", allAccounts);
			setAccounts(allAccounts.getAllAccounts.entire);
		}
	}, [allAccounts]);

	useEffect(() => {
		if (getAccountsError) {
			console.log("get accounts error => ", getAccountsError);
			toast.error("Error occured while getting accounts");
		}
	}, [getAccountsError]);

	useEffect(() => {
		getAllAccounts({
			variables: { query: "ma" }
		});
	}, []);

	const onFinish = async (values) => {
		updateAccount({
			variables: {
				id: parseInt(id),
				...values
			}
		})
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoading(false);
	};

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setOpen(false);
		}, 3000);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={showModal} size='small'>
				Update Account
			</Button>
			<Modal
				open={open}
				title='Title'
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key='back' type='danger' onClick={handleCancel}>
						cancel
					</Button>,
				]}>
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
						...initValues,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Form.Item
						style={{ marginBottom: "10px" }}
						name='name'
						label='Name'
						rules={[
							{
								required: true,
								message: "Please input debit account!",
							},
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						style={{ marginBottom: "10px" }}
						name='account_id'
						label='Account Type'
						rules={[
							{
								required: true,
								message: "Please input debit account!",
							},
						]}>
						<Select
							loading={!accounts}
							showSearch
							style={{
								width: 200,
							}}
							placeholder='Select Account Type'
							optionFilterProp='children'
							filterOption={(input, option) => option.children.includes(input)}
							filterSort={(optionA, optionB) =>
								optionA.children
									.toLowerCase()
									.localeCompare(optionB.children.toLowerCase())
							}>
							{accounts &&
								accounts.map((acc) => (
									<Select.Option key={acc.id} value={acc.id}>
										{acc.name}
									</Select.Option>
								))}
						</Select>
					</Form.Item>

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
							loading={loading}
							onClick={() => setLoading(true)}>
							Update Account
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default UpdateAccount;
