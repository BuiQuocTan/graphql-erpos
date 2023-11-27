import { gql } from "@apollo/client";

const CREATE_CATEGORY_MUTATION = gql`
mutation createCategory($query: String, $name: String, $ids: [Int], $categories: [String]) {
    createCategory(query: $query, name: $name, ids: $ids, categories: $categories) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
mutation updateOneCategory($id: Int, $name: String) {
    updateSingleProductCategory(id: $id, name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
mutation deleteOneCategory($id: Int) {
    deleteSingleProductCategory(id:$id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export { CREATE_CATEGORY_MUTATION, UPDATE_CATEGORY_MUTATION, DELETE_CATEGORY_MUTATION }