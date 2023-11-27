import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
mutation createOneAccount($account_id: Int, $name: String) {
    createSingleAccount(account_id: $account_id, name: $name) {
        id
        name
        account_id
        status
    }
}
`;

const UPDATE_ACCOUNT_MUTATION = gql`
mutation updateAccount($id: Int, $account_id: Int, $name: String) {
    updateSingleAccount(id: $id, account_id: $account_id, name: $name) {
      id
      name
      account_id
      status
    }
  }
`;

const DELETE_ACCOUNT_MUTATION = gql`
mutation deleteAccount($id: Int, $status: Boolean) {
    deleteSingleAccount(id: $id, status: $status) {
      id
      name
      account_id
      status
    }
  }
  
`;

export { CREATE_ACCOUNT_MUTATION, UPDATE_ACCOUNT_MUTATION, DELETE_ACCOUNT_MUTATION }