import { gql } from "@apollo/client";

const CREATE_PURCHASE_MUTATION = gql`
mutation createOnePurchaseInvoice($purchaseInvoiceProduct: [PurchaseInvoiceProductInput], $date: String, $discount: Float, $paid_amount: Float, $supplier_id: Int, $note: String, $supplier_memo_no: String) {
    createSinglePurchaseInvoice(purchaseInvoiceProduct: $purchaseInvoiceProduct, date: $date, discount: $discount, paid_amount: $paid_amount, supplier_id: $supplier_id, note: $note, supplier_memo_no: $supplier_memo_no) {
      id
      date
      total_amount
      discount
      paid_amount
      due_amount
      supplier_id
      note
      supplier_memo_no
      created_at
      updated_at
      supplier{
        id
      }
    }
  }
`;

export { CREATE_PURCHASE_MUTATION };