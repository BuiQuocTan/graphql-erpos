import { Line } from "@ant-design/plots";
import { Card, DatePicker } from "antd";
import moment from "moment";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/actions/dashboard/getDashboardDataAction";
import { loadAllPurchase } from "../../../redux/actions/purchase/getPurchaseAction";
import { loadAllSale } from "../../../redux/actions/sale/getSaleAction";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";

import { useLazyQuery } from "@apollo/client";
import { GET_DASHBOARDDATA_QUERY } from "../../../queries/dashbaord.query";
import { GET_ALLPURCHASE_QUERY } from "../../../queries/purchaseInvoice.query";
import { GET_ALLSALEINVOICE_QUERY } from "../../../queries/saleInvoice.query";
import { toast } from "react-toastify";

const DemoLine = () => {
	//Date fucntinalities
	const [startdate, setStartdate] = useState(moment().startOf("month"));
	const [enddate, setEnddate] = useState(moment().endOf("month"));
	const dispatch = useDispatch();

	const data = useSelector((state) => state.dashboard.list?.saleProfitCount);
	const cardInformation = useSelector(
		(state) => state.dashboard.list?.cardInfo
	);

	const { RangePicker } = DatePicker;

	const [getDashboardData, { data: dashboardData, error: dashboardError }] = useLazyQuery(GET_DASHBOARDDATA_QUERY);
	const [getAllPurchase, { data: purchaseData, error: purchaseError }] = useLazyQuery(GET_ALLPURCHASE_QUERY);
	const [getAllSales, { data: saleData, error: saleError }] = useLazyQuery(GET_ALLSALEINVOICE_QUERY);

	const fetchDashboardData = useCallback(variables => {
		getDashboardData({ variables });
	});

	const fetchAllPurchase = useCallback(variables => {
		getAllPurchase({ variables });
	});

	const fetchAllSales = useCallback(variables => {
		getAllSales({ variables });
	})

	useEffect(() => {
		if (dashboardData) {
			console.log("dashboard data => ", dashboardData);
			dispatch(loadDashboardData(dashboardData.dashboardData));
		}
	}, [dashboardData]);

	useEffect(() => {
		if (dashboardError) {
			console.log("dashboard error => ", dashboardError);
			toast.error("Error occured while getting dashboard info")
		}
	}, [dashboardError]);

	useEffect(() => {
		if (purchaseData) {
			console.log("purchase data => ", purchaseData);
			dispatch(loadAllPurchase(purchaseData.getAllPurchaseInvoice));
		}
	}, [purchaseData]);

	useEffect(() => {
		if (purchaseError) {
			console.log("purchase error => ", purchaseError);
			toast.error("Error occured while getting puchase info");
		}
	}, [purchaseError]);

	useEffect(() => {
		if (saleData) {
			console.log("sale data => ", saleData)
			dispatch(loadAllSale(saleData.allSaleInvoiceData));
		}
	}, [saleData]);

	useEffect(() => {
		if (saleError) {
			console.log("sale error => ", saleError);
			toast.error("Error occured while getting sale info");
		}
	}, [saleError]);

	useEffect(() => {
		fetchDashboardData({ startdate, enddate });
		fetchAllPurchase({ startdate, enddate, page: 1, limit: 10 });
		fetchAllSales({ startdate, enddate, page: 1, limit: 10 });
	}, []);

	const onCalendarChange = (dates) => {
		const newStartdate = (dates?.[0]).format("YYYY-MM-DD");
		const newEnddate = (dates?.[1]).format("YYYY-MM-DD");

		setStartdate(newStartdate ? newStartdate : startdate);
		setEnddate(newEnddate ? newEnddate : enddate);

		fetchDashboardData({ startdate: newStartdate, enddate: newEnddate });
		fetchAllPurchase({ page: 1, limit: 10, startdate: newStartdate, enddate: newEnddate, });
		fetchAllSales({ page: 1, limit: 10, startdate: newStartdate, enddate: newEnddate, });
	};

	const config = {
		data,
		xField: "date",
		yField: "amount",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: (v) => `${v / 1000} K`,
			},
		},
		legend: {
			position: "top",
		},
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 5000,
			},
		},
	};

	return (
		<Fragment>
			<div className='mb-3 mt-3 w-full' style={{ maxWidth: "25rem" }}>
				<RangePicker
					onCalendarChange={onCalendarChange}
					defaultValue={[startdate, enddate]}
					className='range-picker'
				/>
			</div>

			<NewDashboardCard information={cardInformation} />

			<Card title='Sales vs Profit'>
				{data ? <Line {...config} /> : <Loader />}
			</Card>
		</Fragment>
	);
};

export default DemoLine;
