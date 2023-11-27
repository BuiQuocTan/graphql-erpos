import { ADD_SUPPLIER_PAYMENT } from "../../types/SupplierPaymentType";

export const addSupplierPayment = (data) => {
	return {
		type: ADD_SUPPLIER_PAYMENT,
		payload: data,
	};
};