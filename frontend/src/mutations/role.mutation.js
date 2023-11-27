import { gql } from "@apollo/client";

const CREATE_ROLE_MUTATION = gql`
mutation createRole($query: String, $name: String, $ids: [Int], $roles: [String]) {
    createSingleRole(query: $query, name: $name, ids: $ids, roles: $roles) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_ROLE_MUTATION = gql`
mutation updateRole($id: Int, $name: String) {
    updateSingleRole(id: $id, name: $name) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;

const DELETE_ROLE_MUTATION = gql`
mutation deleteRole($id: Int, $status: Boolean) {
    deleteSingleRole(id: $id, status: $status) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
  
`;

export { CREATE_ROLE_MUTATION, UPDATE_ROLE_MUTATION, DELETE_ROLE_MUTATION }