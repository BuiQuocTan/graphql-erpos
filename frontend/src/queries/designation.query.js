import { gql } from "@apollo/client";

const GET_ALLDESCIGNATIONS_QUERY = gql`
query getAllDesignations($query: String, $count: Int, $page: Int) {
    getAllDesignation(query: $query, count: $count, page: $page) {
      id
      name
      createdAt
      updatedAt
      user {
        id
        username
        email
        role
        salary
        designation {
          id
          name
          createdAt
          updatedAt
        }
        join_date
        leave_date
        phone
        id_no
        address
        blood_group
        image
        status
        createdAt
        updatedAt
      }
    }
  }  
`;

const GET_ONEDESCIGNATION_QUERY = gql`
query getOneDesignation($id: Int) {
    getSingleDesignation(id: $id) {
      id
      name
      createdAt
      updatedAt
      user {
        id
        username
        email
        role
        salary
        designation {
          id
          name
          createdAt
          updatedAt
        }
        join_date
        leave_date
        phone
        id_no
        address
        blood_group
        image
        status
        createdAt
        updatedAt
      }
    }
  }  
`;

export { GET_ALLDESCIGNATIONS_QUERY, GET_ONEDESCIGNATION_QUERY };
