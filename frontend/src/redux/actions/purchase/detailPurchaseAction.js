import { PURCHASE_DETAILS } from "../../types/PurchaseType";

export const loadSinglePurchase = (data) => {
  return {
    type: PURCHASE_DETAILS,
    payload: data,
  };
};