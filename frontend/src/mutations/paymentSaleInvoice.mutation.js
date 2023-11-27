import { gql } from "@apollo/client";

const CREATE_PAYNENTSALEINVOICE_MUTATION = gql`
mutation createOnePaymentSaleInvoice($date: String, $amount: Float, $sale_invoice_no: Int, $discount: Float) {
    createSinglePaymentSaleInvoice(date: $date, amount: $amount, sale_invoice_no: $sale_invoice_no, discount: $discount) {
      transaction1 {
        id
        date
        debit_id
        credit_id
        particulars
        amount
        type
        related_id
        status
        created_at
        updated_at
      }
      transaction2 {
        id
        date
        debit_id
        credit_id
        particulars
        amount
        type
        related_id
        status
        created_at
        updated_at
      }
    }
  }
`;

export { CREATE_PAYNENTSALEINVOICE_MUTATION }