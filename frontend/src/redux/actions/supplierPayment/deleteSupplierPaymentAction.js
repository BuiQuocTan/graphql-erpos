import { DELETE_SUPPLIER_PAYMENT } from "../../types/SupplierPaymentType";

export const deleteSupplierPayment = (id) => {
  return {
    type: DELETE_SUPPLIER_PAYMENT,
    payload: id,
  };
};