import { gql } from "@apollo/client";

const GET_ALLRETURNPURCHASEINVOICE_QUERY = gql`
query getAllReturnPurchaseInvoice($query: String, $startdate: String, $enddate: String, $status: String, $count: Int, $page: Int) {
    getAllReturnPurchaseInvoice(query: $query, startdate: $startdate, enddate: $enddate, status: $status, count: $count, page: $page) {
      aggregations {
        _count {
          id
        }
        _sum {
          total_amount
          discount
          due_amount
          paid_amount
          profit
        }
      }
      allPurchaseInvoice {
        id
        date
        total_amount
        note
        purchaseInvoice_id
        status
        created_at
        updated_at
        purchaseInvoice {
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
        }
      }
      groupBy {
        _count {
          id
        }
        _sum {
          total_amount
        }
        date
      }
    }
  }
`;

const GET_ONERETURNPURCHASEINVOICE_QUERY = gql`
query getOneReturnPurchaseInvoice($id: Int) {
    getSingleReturnPurchaseInvoice(id: $id) {
      id
      date
      total_amount
      note
      purchaseInvoice_id
      status
      created_at
      updated_at
      purchaseInvoice {
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
      }
      returnPurchaseInvoiceProduct {
        id
        product_id
        invoice_id
        product_quantity
        product_purchase_price
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
    }
  }
  
`;

export { GET_ALLRETURNPURCHASEINVOICE_QUERY, GET_ONERETURNPURCHASEINVOICE_QUERY }