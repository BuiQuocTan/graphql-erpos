import { gql } from "@apollo/client";

const CREATE_SUPPLIER_MUTATION = gql`
mutation createOneSupplier($name: String, $phone: String, $address: String) {
    createSingleSupplier(name: $name, phone: $phone, address: $address) {
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

const UPDATE_SUPPLIER_MUTATION = gql`
mutation updateOneSupplier($id: Int, $name: String, $phone: String, $address: String) {
    updateSingleSupplier(id: $id, name: $name, phone: $phone, address: $address) {
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

const DELETE_SUPPLIER_MUTATION = gql`
mutation deleteOneSupplier($id: Int, $status: Boolean) {
    deleteSingleSupplier(id: $id, status: $status) {
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

export { CREATE_SUPPLIER_MUTATION, UPDATE_SUPPLIER_MUTATION, DELETE_SUPPLIER_MUTATION }