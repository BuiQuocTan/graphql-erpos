import { gql } from "@apollo/client";

const CREATE_DESCIGNATION_MUTATION = gql`
mutation createDesignation($name: String) {
    createDesignation(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_DESCIGNATION_MUTATION = gql`
mutation updateDesigantion($id: Int, $name: String) {
    updateSingleDesignation(id: $id, name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }  
`;

const DELETE_DESCIGNATION_MUTATION = gql`
mutation deleteeDesigantion($id: Int) {
    deleteSingleDesignation(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export { CREATE_DESCIGNATION_MUTATION, UPDATE_DESCIGNATION_MUTATION, DELETE_DESCIGNATION_MUTATION };