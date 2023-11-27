import { gql } from "@apollo/client";

const GET_ALLPAYNENTSALEINVOICE_QUERY = gql`
query getAllPaymentSaleInvoice($query: String, $page: Int, $count: Int) {
    getAllPaymentSaleInvoice(query: $query, page: $page, count: $count) {
      allPaymentSaleInvoice {
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
      aggregations {
        _count {
          id
        }
        _sum {
          amount
        }
      }
    }
  }  
`;

export { GET_ALLPAYNENTSALEINVOICE_QUERY }