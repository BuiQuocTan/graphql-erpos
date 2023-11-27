import { ADD_SALE } from "../../types/SaleType";

export const addSale = (data) => {
  return {
    type: ADD_SALE,
    payload: data,
  };
};