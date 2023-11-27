import { gql } from "@apollo/client";

const CREATE_ROLE_PERMISSION_MUTATION = gql`
mutation createRolePermission($query: String, $permissionIds: [Int], $roleId: Int, $rolePermissionIds: [Int]) {
  createRolePermission(query: $query, permissionIds: $permissionIds, roleId: $roleId, rolePermissionIds: $rolePermissionIds) {
    _count {
      id
    }
  }
}
`;

const UPDATE_ROLE_PERMISSION_MUTATION = gql`
mutation updateRolePermssion($id: Int, $status: Boolean) {
  updateRolePermission(id: $id, status: $status) {
    id
    role_id
    permission_id
    status
    createdAt
    updatedAt
  }
}
`;

const DELETE_ROLE_PERMISSION_MUTATION = gql`
mutation deleteOneRolePermission($id: Int) {
  deleteSingleRolePermission(id: $id) {
    id
    role_id
    permission_id
    status
    createdAt
    updatedAt
  }
}
`;

export { CREATE_ROLE_PERMISSION_MUTATION, UPDATE_ROLE_PERMISSION_MUTATION, DELETE_ROLE_PERMISSION_MUTATION }