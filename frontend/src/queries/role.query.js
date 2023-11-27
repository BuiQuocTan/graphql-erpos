import { gql } from "@apollo/client";

const GET_ALLROLES_QUERY = gql`
query getAllRoles($query: String, $count: Int, $page: Int) {
    getAllRole(query: $query, count: $count, page: $page) {
      id
      name
      status
      createdAt
      updatedAt
      rolePermission {
        id
        role_id
        permission_id
        status
        createdAt
        updatedAt
        permission {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const GET_ONEROLE_QUERY = gql`
query getOneRole($id: Int) {
    getSingleRole(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
      rolePermission {
        id
        role_id
        permission_id
        status
        createdAt
        updatedAt
        permission {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
  
`;

export { GET_ALLROLES_QUERY, GET_ONEROLE_QUERY };