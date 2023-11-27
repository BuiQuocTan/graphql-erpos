import { TRANSACTIONS } from "../../types/TransactionType";

export const loadAllTransaction = (data) => {
	return {
		type: TRANSACTIONS,
		payload: data,
	};
};
