import { gql } from "@apollo/client";

const CREARTE_SALEINVOICE_MUTATION = gql`
mutation createSaleInvoice($saleInvoiceProduct: [IncomeSaleInvoiceProduct], $date: String, $discount: Float, $paid_amount: Float, $customer_id: Int, $user_id: Int, $note: String) {
    createSingleSaleInvoice(saleInvoiceProduct: $saleInvoiceProduct, date: $date, discount: $discount, paid_amount: $paid_amount, customer_id: $customer_id, user_id: $user_id, note: $note) {
      id
      date
      total_amount
      discount
      paid_amount
      due_amount
      profit
      customer_id
      user_id
      note
      created_at
      updated_at
      saleInvoiceProduct {
        id
        product_id
        invoice_id
        product_quantity
        product_sale_price
        created_at
        updated_at
        product {
          id
          name
          quantity
          purchase_price
          sale_price
          imageName
          product_category_id
          unit_measurement
          unit_type
          sku
          reorder_quantity
          status
          created_at
          updated_at
        }
      }
      customer {
        id
        name
        phone
        address
        status
        created_at
        updated_at
      }
      user {
        id
        username
      }
    }
  }  
`;

export { CREARTE_SALEINVOICE_MUTATION }