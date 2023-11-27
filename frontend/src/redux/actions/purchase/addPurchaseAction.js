import { ADD_PURCHASE } from "../../types/PurchaseType";

export const addPurchase = (data) => {
  return {
    type: ADD_PURCHASE,
    payload: data,
  };
};