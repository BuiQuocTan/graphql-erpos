import { ADD_PRODUCT } from "../../types/ProductType";

export const addProduct = (data) => {
  return {
    type: ADD_PRODUCT,
    payload: data,
  };
};