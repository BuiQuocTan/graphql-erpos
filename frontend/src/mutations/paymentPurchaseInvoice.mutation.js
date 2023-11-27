import { gql } from "@apollo/client";

const CREATE_PAYNENTPURCHASEINVOICE_MUTATION = gql`
mutation createPaymentPurchaseInvoice($date: String, $amount: Float, $purchase_invoice_no: Int, $discount: Float) {
    createPaymentPurchaseInvoice(date: $date, amount: $amount, purchase_invoice_no: $purchase_invoice_no, discount: $discount) {
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

export { CREATE_PAYNENTPURCHASEINVOICE_MUTATION }
