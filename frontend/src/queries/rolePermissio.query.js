
import { gql } from "@apollo/client";

const GET_ALLROLES_PERMISSION_QUERY = gql`
query getAllRolesPermission($query: String, $count: Int, $page: Int) {
    getAllRolePermission(query: $query, count: $count, page: $page) {
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

const GET_ONEROLE_PERMISSION_QUERY = gql`
query getOneRolePermission($id: Int) {
    getSingleRolePermission(id: $id) {
      id
      role_id
      permission_id
      status
      createdAt
      updatedAt
      role {
        id
        name
        status
        createdAt
        updatedAt
      }
      permission {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export { GET_ALLROLES_PERMISSION_QUERY, GET_ONEROLE_PERMISSION_QUERY }