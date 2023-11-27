import { Card } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../page-header/PageHeader";
import { toast } from "react-toastify";

import { useLazyQuery } from "@apollo/client";
import { GET_ALLACCOUNTS_QUERY } from "../../queries/account.query";

const TrialBalance = () => {
	const [data, setData] = useState([]);

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

	//make a use effect to get the data from the getTrailBalance function
	useEffect(() => {
		getAllAccounts({
			variables: { query: "tb" }
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
								Trail Balance
							</span>
						</h5>
					</div>
					<table className='table report-section-table'>
						<thead className='thead-dark'>
							<tr>
								<th scope='col'>Account</th>
								<th scope='col'>Debit</th>
								<th scope='col'>Credit</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data?.debits?.map((item, index) => {
									return (
										<tr>
											<td>{item.subAccount}</td>
											<td>{item.balance}</td>
											<td></td>
										</tr>
									);
								})}
							{data &&
								data?.credits?.map((item, index) => {
									return (
										<tr>
											<td>{item.subAccount}</td>
											<td></td>
											<td>{item.balance}</td>
										</tr>
									);
								})}

							<tr className='table-active'>
								<td>TOTAL</td>
								<td>{data?.totalDebit}</td>
								<td>{data?.totalCredit}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Card>
		</>
	);
};

export default TrialBalance;
