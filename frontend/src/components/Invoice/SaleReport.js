import { Button } from "antd";
import moment from "moment";
import React, { forwardRef, Fragment, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import "./saleReport.module.css";

import { useLazyQuery } from "@apollo/client";
import { GET_SETTING_QUERY } from "../../queries/setting.query";

const PrintToPdf = forwardRef(
	({ data, settingData, date, user, total }, ref) => {
		// make the sum of all the discount in the data array
		const totalDiscount = data?.reduce((acc, item) => {
			return acc + item.discount;
		}, 0);

		return (
			<Fragment>
				<div ref={ref} className='wrapper'>
					<div className='box2'>
						<h1>{settingData?.company_name}</h1>
						<h3>{settingData?.tag_line}</h3>
						<p>{settingData?.address}</p>
						<p>{settingData?.phone}</p>
						<p>Email: {settingData?.email}</p>
						<p>Website: {settingData?.website}</p>
					</div>
					<div className='box4'>
						<hr className='hr1' />
						<h3 className='center'>SALES REPORT</h3>
						<hr className='hr1' />
					</div>

					<div className='box5'>
						<table className='table2'>
							<tr>
								<th>Type</th>
								<td>All</td>
							</tr>
							<tr>
								<th>Sales Person</th>
								<td>{user ? data[0]?.user?.username : "All"} </td>
							</tr>
						</table>
					</div>

					<div className='box6'>
						<table className='table2'>
							<tr>
								<th>From Date</th>
								<td>{date?.startdate}</td>
							</tr>
							<tr>
								<th>To Date</th>
								<td>{date?.enddate}</td>
							</tr>
						</table>
					</div>

					<div className='box7'>
						<table className='table1'>
							<thead>
								<th>Date</th>
								<th>Invoice</th>
								<th>Staff</th>
								<th>Customer</th>
								<th>Product</th>
								<th>Qty</th>
								<th>U.M</th>
								<th>U.T</th>
								<th>Total</th>
								<th>S Total</th>
								<th>Discount</th>
								<th>G Total</th>
								<th>Paid</th>
								<th>Due</th>
							</thead>
							<tbody>
								{data &&
									data?.map((i) => (
										<tr>
											<td>{moment(i.date).format("ll")}</td>
											<td>
												<p>{i.id}</p>
											</td>
											<td>{i.user.username}</td>
											<td>{i.customer.name}</td>
											<td>
												{i.saleInvoiceProduct.map((s) => (
													<p>{s.product.name}</p>
												))}
											</td>
											<td>
												{i.saleInvoiceProduct.map((s) => (
													<p>{s.product_quantity}</p>
												))}
											</td>
											<td>
												{i.saleInvoiceProduct.map((s) => (
													<p>{s.product.unit_measurement}</p>
												))}
											</td>
											<td>
												{i.saleInvoiceProduct.map((s) => (
													<p>{s.product.unit_type}</p>
												))}
											</td>
											<td>
												{i.saleInvoiceProduct.map((s) => (
													<p>{s.product_quantity * s.product.sale_price}</p>
												))}
											</td>
											<td>{i.total_amount}</td>
											<td>{i.discount}</td>
											<td>{i.total_amount - i.discount}</td>
											<td>{i.paid_amount}</td>
											<td>{i.due_amount}</td>
										</tr>
									))}

								<tr className='font-weight-bold'>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>{total?.total_unit_quantity}</td>
									<td>{total?.total_unit_measurement}</td>
									<td></td>
									<td></td>
									<td>{total?.total_amount}</td>
									<td>{totalDiscount}</td>
									<td>{total?.total_amount - totalDiscount}</td>
									<td>{total?.paid_amount}</td>
									<td>{total?.due_amount}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className='box12'>
						<hr />
						<p>Powered by OMEGA SOLUTION | Contact: 01885 996601</p>
					</div>
				</div>
			</Fragment>
		);
	}
);

const SaleReportPrint = ({ data, date, user, total }) => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const [settingData, setsettingData] = useState(null);
	const [getSetting, { data: settingInfo, error: getSettingError }] = useLazyQuery(GET_SETTING_QUERY);

	useEffect(() => {
		if (settingInfo) {
			console.log("setting data => ", settingInfo);
			setsettingData(settingInfo.getSetting);
		}
	}, [settingInfo]);

	useEffect(() => {
		if (getSettingError) {
			console.log("get setting error => ", getSettingError);
			toast.error("Error occured while getting app setting");
		}
	}, [getSettingError]);

	useEffect(() => {
		getSetting();
	}, []);

	return (
		<div>
			{data && (
				<div className='hidden'>
					<PrintToPdf
						ref={componentRef}
						data={data}
						settingData={settingData}
						date={date}
						user={user}
						total={total}
					/>
				</div>
			)}
			{settingData && (
				<button
					className='btn btn-primary btn-sm mb-1 button-size'
					onClick={handlePrint}>
					Print PDF
				</button>
			)}
		</div>
	);
};

export default SaleReportPrint;