import { gql } from "@apollo/client";

const CREATE_RETURNSALEINVOICE_MUTATION = gql`
mutation createOneReturnSaleInvoice($returnSaleInvoiceProduct: [IncomeReturnSaleInvoiceProduct], $saleInvoice_id: Int, $date: String, $note: String) {
    createSingleReturnSaleInvoice(returnSaleInvoiceProduct: $returnSaleInvoiceProduct, saleInvoice_id: $saleInvoice_id, date: $date, note: $note) {
      id
      date
      total_amount
      note
      saleInvoice_id
      status
      created_at
      updated_at
    }
  }
`;

const DELETE_RETURNSALEINVOICE_MUTATION = gql`
mutation deleteOneReturnSaleInvoice($id: Int, $status: Boolean) {
    deleteSingleReturnSaleInvoice(id: $id, status: $status) {
      id
      date
      total_amount
      note
      saleInvoice_id
      status
      created_at
      updated_at
    }
  }
`;

export { CREATE_RETURNSALEINVOICE_MUTATION, DELETE_RETURNSALEINVOICE_MUTATION }