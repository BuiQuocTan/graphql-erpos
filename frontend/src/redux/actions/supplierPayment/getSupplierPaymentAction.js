import { SUPPLIERS_PAYMENT } from "../../types/SupplierPaymentType";

export const loadSupplierAllPayment = (data) => {
	return {
		type: SUPPLIERS_PAYMENT,
		payload: data,
	};
};
