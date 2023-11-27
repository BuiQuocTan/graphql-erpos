import { Card } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../page-header/PageHeader";
import { toast } from "react-toastify";

import { useLazyQuery } from "@apollo/client";
import { GET_ALLACCOUNTS_QUERY } from "../../queries/account.query";

const IncomeStatement = () => {
	const [data, setData] = useState(null);

	const [getAllAccounts, { data: allAccountsInfo, error: allAccountsError }] = useLazyQuery(GET_ALLACCOUNTS_QUERY);

	useEffect(() => {
		if (allAccountsInfo) {
			console.log("all accounts info => ", allAccountsInfo.getAllAccounts);
			setData(allAccountsInfo.getAllAccounts);
		}
	}, [allAccountsInfo]);

	useEffect(() => {
		if (allAccountsError) {
			console.log("all accouns error => ", allAccountsError);
			toast.error("Error occured while getting accounts")
		}
	}, [allAccountsError]);

	useEffect(() => {
		getAllAccounts({
			variables: { query: "is" }
		});
	}, []);

	return (
		<>
			<PageTitle title={"Back"} />
			<br />
			<Card>
				<div>
					<div className='card-title d-flex justify-content-between'>
						<h5>
							<span className='ms-2 report-section-card-title'>
								Income Statement{" "}
							</span>
						</h5>
					</div>

					<table className='table report-section-table'>
						<h5 className='mt-2 mb-2 font-weight-bold'> Revenue </h5>
						<thead className='thead-dark'>
							<tr>
								<th scope='col'>Account</th>
								<th scope='col'>Amount</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data?.revenue.map((item, index) => {
									return (
										<tr>
											<td>{item.subAccount}</td>
											<td>{item.balance}</td>
										</tr>
									);
								})}

							<tr className='table-active'>
								<td>
									{" "}
									<strong>TOTAL</strong>
								</td>
								<td>
									<strong>{data?.totalRevenue}</strong>
								</td>
							</tr>

							<h5 className='mt-2 mb-2 font-weight-bold'> Expense</h5>

							{data &&
								data?.expense.map((item, index) => {
									return (
										<tr>
											<td>{item.subAccount}</td>
											<td>{item.balance}</td>
										</tr>
									);
								})}

							<tr className='table-active'>
								<td>
									<strong>TOTAL</strong>
								</td>
								<td>
									<strong>{data?.totalExpense}</strong>
								</td>
							</tr>

							<h5 className='mt-2 mb-2 font-weight-bold'> Profit</h5>
							<tr className='table-active'>
								<td>
									{" "}
									<strong>Total </strong>
								</td>
								<td>
									<strong>{data?.profit}</strong>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Card>
		</>
	);
};

export default IncomeStatement;
