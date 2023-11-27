import { CUSTOMERS } from "../../types/CustomerType";

export const loadAllCustomer = (data) => {
	return {
		type: CUSTOMERS,
		payload: data,
	};
};