
import { gql } from "@apollo/client";

const GET_PERMISSIONS_QUERY = gql`
query getAllPermissions($query: String, $page: Int, $count: Int) {
    getAllPermission(query: $query, page: $page, count: $count){
        id
        name
        createdAt
        updatedAt
    }
}
`;

export { GET_PERMISSIONS_QUERY }