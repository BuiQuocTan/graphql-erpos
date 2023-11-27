import { gql } from "@apollo/client";


const ADD_USER_MUTATION = gql`
mutation RegisterMutation($username: String!, $password: String!, $email: String!, $join_date: String!, $leave_date: String!, $role: String!, $id_no: String!, $phone: String!, $address: String!, $salary: Int!, $blood_group: String!, $designation_id: Int!) {
  createUser(username: $username, password: $password, email: $email, join_date: $join_date, leave_date: $leave_date, role: $role, id_no: $id_no, phone: $phone, address: $address, salary: $salary, blood_group: $blood_group, designation_id: $designation_id) {
    id
    username
    email
    salary
    designation_id
    role
    join_date
    leave_date
    id_no
    department
    phone
    address
    blood_group
    image
    status
    message
  }
}

`;

const UPDATE_USER_MUTATION = gql`
mutation updateUser($id: Int, $username: String, $password: String, $join_date: String, $leave_date: String, $role: String, $email: String, $salary: Int, $id_no: String, $department: String, $phone: String, $address: String, $blood_group: String, $image: String, $status: Boolean, $designation_id: Int) {
    updateSingleUser(id: $id, username: $username, password: $password, join_date: $join_date, leave_date: $leave_date, role: $role, email: $email, salary: $salary, id_no: $id_no, department: $department, phone: $phone, address: $address, blood_group: $blood_group, image: $image, status: $status, designation_id: $designation_id) {
      id
      username
      role
      email
      salary
      designation_id
      join_date
      leave_date
      id_no
      department
      phone
      address
      blood_group
      image
      status
      message
    }
  }
`;

const DELETE_USER_MUTATION = gql`
mutation DeleteUser($id: Int!, $status: Boolean!) {
    deleteUser(id: $id, status: $status) {
      username
      message
    }
  }
  
`;

export { ADD_USER_MUTATION, UPDATE_USER_MUTATION, DELETE_USER_MUTATION }