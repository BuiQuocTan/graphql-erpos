import { SUPPLIER_DETAILS_PAYMENT } from "../../types/SupplierPaymentType";

export const loadSupplierSinglePayment = (data) => {
  return {
    type: SUPPLIER_DETAILS_PAYMENT,
    payload: data,
  };
};
