import { PRODUCT_CATEGORY_DETAILS } from "../../types/ProductCategoryType";

export const loadSingleProductCategory = (data) => {
	return {
		type: PRODUCT_CATEGORY_DETAILS,
		payload: data,
	};
};