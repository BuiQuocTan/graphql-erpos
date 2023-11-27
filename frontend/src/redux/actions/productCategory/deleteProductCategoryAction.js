import { DELETE_PRODUCT_CATEGORY } from "../../types/ProductCategoryType";

export const DeleteProductCategory = (id) => {
	//dispatching with an call back function and returning that
	return {
		type: DELETE_PRODUCT_CATEGORY,
		payload: id,
	};
};