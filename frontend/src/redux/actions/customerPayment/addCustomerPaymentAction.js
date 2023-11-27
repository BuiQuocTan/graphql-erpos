import { ADD_CUSTOMER_PAYMENT } from "../../types/CustomerPaymentType";

export const addCustomerPayment = (data) => {
	return {
		type: ADD_CUSTOMER_PAYMENT,
		payload: data,
	};
};