import { TRANSACTION_DETAILS } from "../../types/TransactionType";

export const loadTransaction = (data) => {
	return {
		type: TRANSACTION_DETAILS,
		payload: data,
	};
};