import { PRODUCT_CATEGORYS } from "../../types/ProductCategoryType";

export const loadAllProductCategory = (data) => {
	return {
		type: PRODUCT_CATEGORYS,
		payload: data,
	};
};