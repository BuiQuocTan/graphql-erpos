import { ACCOUNTS } from "../../types/AccountType";

export const loadAllAccount = (data) => {
	return {
		type: ACCOUNTS,
		payload: data,
	};
};