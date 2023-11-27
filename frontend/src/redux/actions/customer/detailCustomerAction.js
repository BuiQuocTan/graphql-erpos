import { CUSTOMER_DETAILS } from "../../types/CustomerType";

export const loadSingleCustomer = (data) => {
  return {
    type: CUSTOMER_DETAILS,
    payload: data,
  };
};