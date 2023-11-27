import { DELETE_SALE } from "../../types/SaleType";

export const deleteSale = (id) => {
	return {
		type: DELETE_SALE,
		payload: id,
	};
};