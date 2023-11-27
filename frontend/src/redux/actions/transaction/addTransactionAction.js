import { ADD_TRANSACTION } from "../../types/TransactionType";

export const addTransaction = (data) => {
	return {
		type: ADD_TRANSACTION,
		payload: data,
	};
};
