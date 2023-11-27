import { ADD_PRODUCT_CATEGORY } from "../../types/ProductCategoryType";

export const addProductCategory = (data) => {
	return {
		type: ADD_PRODUCT_CATEGORY,
		payload: data,
	};
};