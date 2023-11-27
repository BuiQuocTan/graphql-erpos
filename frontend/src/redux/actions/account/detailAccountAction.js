import { ACCOUNT_DETAILS } from "../../types/AccountType";

export const loadSingleAccount = (data) => {
	return {
		type: ACCOUNT_DETAILS,
		payload: data,
	};
};