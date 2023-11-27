import { gql } from "@apollo/client";

const GET_ALLPURCHASE_QUERY = gql`
query getAllPurchaseInvoice($query: String, $page: Int, $limit: Int, $startdate: String, $enddate: String){
  getAllPurchaseInvoice(
    query: $query,
    startdate: $startdate,
    enddate: $enddate,
    count: $limit,
    page: $page,
  ) {
    aggregations {
      _count{
        id
      }
      _sum{
        total_amount
        discount
        due_amount
        paid_amount
        profit
      }
    }
    allPurchaseInvoice{
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
        name
        phone
        address
        status
      }
    }
  }
}
`;

const GET_ONEPURCHASE_QUERY = gql`
query getaaa($id: Int) {
  getSinglePurchaseInvoice(
    id: $id
  ) {
    status
    totalPaidAmount
    totalReturnAmount
    dueAmount
    singlePurchaseInvoice{
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
      purchaseInvoiceProduct{
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
      supplier{
        id
        name
        phone
        address
        status
      }
    }
    returnPurchaseInvoice{
      id
      date
      total_amount
      note
      purchaseInvoice_id
      status
      created_at
      updated_at
      returnPurchaseInvoiceProduct{
        id
        product_id
        invoice_id
        product_quantity
        product_purchase_price
        created_at
        updated_at
        product{
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
          imageUrl
          product_category{
            name
          }
          count
        }
      }
    }
    transactions{
      id
      date
      debit_id
      credit_id
      particulars
      amount
      related_id
      status
      created_at
      updated_at
      debit{
        name
      }
      credit{
        name
      }
    }
  }
}
`;

export { GET_ALLPURCHASE_QUERY, GET_ONEPURCHASE_QUERY };