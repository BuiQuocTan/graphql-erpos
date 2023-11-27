import { gql } from "@apollo/client";

const GET_ALLRETURNSALEINVOICE_QUERY = gql`
query getAllReturnSaleInvoice($query: String, $startdate: String, $enddate: String, $status: String, $count: Int, $page: Int) {
    getAllReturnSaleInvoice(query: $query, startdate: $startdate, enddate: $enddate, status: $status, count: $count, page: $page) {
      aggregations {
        _count {
          id
        }
        _sum {
          total_amount
        }
      }
      allSaleInvoice {
        id
        date
        total_amount
        note
        saleInvoice_id
        status
        created_at
        updated_at
        saleInvoice {
          id
          date
          total_amount
          discount
          paid_amount
          due_amount
          profit
          note
          customer_id
          user_id
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

const GET_ONERETURNSALEINVOICE_QUERY = gql`
query getOneReturnSaleInvoice($id: Int) {
    getSingleReturnSaleInvoice(id: $id) {
      id
      date
      total_amount
      note
      saleInvoice_id
      status
      created_at
      updated_at
      saleInvoice {
        id
        date
        total_amount
        discount
        paid_amount
        due_amount
        profit
        note
        customer_id
        user_id
        created_at
        updated_at
      }
    }
  }
  
`;

export { GET_ALLRETURNSALEINVOICE_QUERY, GET_ONERETURNSALEINVOICE_QUERY }