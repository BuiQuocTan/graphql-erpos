import { POS_PRODUCT } from "../../types/ProductType";

export const loadPosProduct = (data) => {
	return {
		type: POS_PRODUCT,
		payload: data,
	};
};