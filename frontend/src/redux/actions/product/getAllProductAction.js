import { PRODUCTS } from "../../types/ProductType";

export const loadProduct = (data) => {
	return {
		type: PRODUCTS,
		payload: data,
	};
};