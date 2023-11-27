import { SUPPLIER_DETAILS } from "../../types/SuppliersType";

export const loadSupplier = (data) => {
  return {
    type: SUPPLIER_DETAILS,
    payload: data,
  };
};