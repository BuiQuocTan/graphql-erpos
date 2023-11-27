import { gql } from "@apollo/client";

const CREATE_ONERETURNPURCHASEINVOICE_QUERY = gql`
mutation createOneReturnPurchaseInvoice($returnPurchaseInvoiceProduct: [IncomeReturnPurchaseInvoiceProduct], $purchaseInvoice_id: Int, $date: String, $note: String) {
    createSingleReturnPurchaseInvoice(returnPurchaseInvoiceProduct: $returnPurchaseInvoiceProduct, purchaseInvoice_id: $purchaseInvoice_id, date: $date, note: $note) {
      id
      date
      total_amount
      note
      purchaseInvoice_id
      status
      created_at
      updated_at
    }
  }  
`;

const DELETE_ONERETURNPURCHASEINVOICE_QUERY = gql`
mutation deleteOneReturnPurchaseInvoice($id: Int, $status: Boolean) {
    deleteSingleReturnPurchaseInvoice(id: $id, status: $status) {
      id
      date
      total_amount
      note
      purchaseInvoice_id
      status
      created_at
      updated_at
    }
  }
`;

export { CREATE_ONERETURNPURCHASEINVOICE_QUERY, DELETE_ONERETURNPURCHASEINVOICE_QUERY }