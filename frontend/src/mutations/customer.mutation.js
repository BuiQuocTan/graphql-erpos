import { gql } from "@apollo/client";

const CREATE_CUSTOMER_MUTATION = gql`
mutation createCustomer($query: String, $name: String, $phone: String, $address: String) {
    createCustomer(query: $query, name: $name, phone: $phone, address: $address) {
      id
      name
      phone
      address
      status
      created_at
      updated_at
    }
  }
`;

const UPDATE_CUSTOMER_MUTATION = gql`
mutation updateCustomer($id: Int, $name: String, $phone: String, $address: String) {
    updateSingleCustomer(id: $id, name: $name, phone: $phone, address: $address) {
      id
      name
      phone
      address
      status
      created_at
      updated_at
    }
  }  
`;

const DELETE_CUSTOMER_MUTATION = gql`
mutation deleteCustomer($id: Int, $status: Boolean) {
    deleteCustomer(id: $id, status: $status) {
      id
      name
      phone
      address
      status
      created_at
      updated_at
    }
  }  
`;

export { CREATE_CUSTOMER_MUTATION, UPDATE_CUSTOMER_MUTATION, DELETE_CUSTOMER_MUTATION }