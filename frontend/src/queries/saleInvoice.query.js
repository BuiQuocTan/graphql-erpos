import { gql } from "@apollo/client";

const GET_ALLSALEINVOICE_QUERY = gql`
    query getAllSaleInvoice(
        $user: Int
        $page: Int
        $limit: Int
        $startdate: String!
        $enddate: String!
    ) {
      allSaleInvoiceData(user: $user, page: $page, count: $limit, startdate: $startdate, enddate: $enddate) {
          aggregations{
            _count{
              id
            }
            _sum{
              total_amount
              paid_amount
              discount
              total_amount
              total_unit_quantity
              total_unit_measurement
              profit
            }
          }
          allSaleInvoice{
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
            saleInvoiceProduct{
              id
              product_id
              invoice_id
              product_quantity
              product_sale_price
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
              }
            }
            customer{
              id
              name
              phone
              address
              status
              created_at
              updated_at
            }
            user{
              id
              username
            }
            total_unit_measurement
          }
       }
      }
`;

const GET_ONESALEINVOICE_QUERY = gql`
query getOneSaleInvoice($id: Int) {
  getSingleSaleInvoice(id: $id) {
    status
    totalPaidAmount
    totalReturnAmount
    dueAmount
    totalUnitMeasurement
    singleSaleInvoice {
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
      total_unit_measurement
    }
    returnSaleInvoice {
      id
      date
      total_amount
      note
      saleInvoice_id
      status
      created_at
      updated_at
      returnSaleInvoiceProduct {
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
    }
    transactions {
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
      debit {
        name
      }
      credit {
        name
      }
    }
  }
}
`;

export { GET_ALLSALEINVOICE_QUERY, GET_ONESALEINVOICE_QUERY };