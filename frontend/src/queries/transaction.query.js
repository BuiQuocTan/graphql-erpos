import { gql } from "@apollo/client";

const GET_ALLTRANSACTION_QUERY = gql`
query getAllTransactions($query: String, $startdate: String, $enddate: String, $page: Int, $limit: Int) {
    allTransactionsData(query: $query, startdate: $startdate, enddate: $enddate, page: $page, count: $limit) {
      aggregations{
        _count {
                id
            }
        _sum{
                amount
            }
        }
      allTransaction{
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

const GET_ONETRANSACTION_QUERY = gql`
query getOneTransaction($id: Int) {
	getSingleTransaction(id: $id) {
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
`;

export { GET_ALLTRANSACTION_QUERY, GET_ONETRANSACTION_QUERY };