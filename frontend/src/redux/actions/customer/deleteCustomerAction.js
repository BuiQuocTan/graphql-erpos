import { DELETE_CUSTOMER } from "../../types/CustomerType";

export const deleteCustomer = (id) => {
	return {
		type: DELETE_CUSTOMER,
		payload: id,
	};
};