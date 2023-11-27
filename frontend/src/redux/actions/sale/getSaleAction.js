import { SALES } from "../../types/SaleType";

export const loadAllSale = (data) => {
	return {
		type: SALES,
		payload: data,
	};
};