import { SALE_DETAILS } from "../../types/SaleType";

export const loadSingleSale = (data) => {
  return {
    type: SALE_DETAILS,
    payload: data,
  };
};
