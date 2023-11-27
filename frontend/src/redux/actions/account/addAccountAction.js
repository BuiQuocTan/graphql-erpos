import { ADD_ACCOUNT } from "../../types/AccountType";

export const addAccount = (data) => {
	return {
		type: ADD_ACCOUNT,
		payload: data,
	};
};