import { gql } from "@apollo/client";

const CREATE_TRANSACTION_MUTATION = gql`
mutation createTransaction($date: String, $debit_id: Int, $credit_id: Int, $particulars: String, $amount: Float) {
    createSingleTransaction(date: $date, debit_id: $debit_id, credit_id: $credit_id, particulars: $particulars, amount: $amount) {
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
`;

const UPDATE_TRANSACTION_MUTATION = gql`
mutation createTransaction($id: Int, $date: String, $particulars: String, $amount: Float) {
    updateSingleTransaction(id: $id, date: $date, particulars: $particulars, amount: $amount) {
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
`;

const DELETE_TRANSACTION_MUTATION = gql`
mutation deleteTransacrtion($id: Int, $status: Boolean) {
  deleteSingleTransaction(id: $id, status: $status) {
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
`;

export { CREATE_TRANSACTION_MUTATION, UPDATE_TRANSACTION_MUTATION, DELETE_TRANSACTION_MUTATION }