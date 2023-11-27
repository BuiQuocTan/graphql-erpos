import { DELETE_PRODUCT } from "../../types/ProductType";

export const deleteProduct = (id) => {
	return {
		type: DELETE_PRODUCT,
		payload: id,
	};
};