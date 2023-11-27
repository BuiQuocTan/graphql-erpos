import { PRODUCT_DETAILS } from "../../types/ProductType";

export const loadSingleProduct = (data) => {
  return {
    type: PRODUCT_DETAILS,
    payload: data,
  };
};