import { ADD_CUSTOMER } from "../../types/CustomerType";

export const addCustomer = (data) => {
	return {
		type: ADD_CUSTOMER,
		payload: data,
	};
};
