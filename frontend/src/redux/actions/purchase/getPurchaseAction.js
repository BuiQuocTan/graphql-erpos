import { PURCHASES } from "../../types/PurchaseType";

export const loadAllPurchase = (data) => {
	return {
		type: PURCHASES,
		payload: data,
	};
};