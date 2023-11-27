import { DELETE_PURCHASE } from "../../types/PurchaseType";

export const deletePurchase = (id) => {
	return {
		type: DELETE_PURCHASE,
		payload: id,
	};
};