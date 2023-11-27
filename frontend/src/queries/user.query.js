import { gql } from "@apollo/client";

const GET_ALLUSERS_QUERY = gql`
query getAllUsers($query: String, $status: String){
  getAllUsers(query: $query, status: $status) {
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
    token
    message
    saleInvoice {
      id
      date
      total_amount
      discount
      paid_amount
      due_amount
      profit
      customer_id
      user_id
      note
      created_at
      updated_at
    }
  }
}
`;

const GET_ONEUSER_QUERY = gql`
query getOneUser($id: Int) {
  getSingleUser(id: $id) {
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
    token
    message
    saleInvoice {
      id
      date
      total_amount
      discount
      paid_amount
      due_amount
      profit
      customer_id
      user_id
      note
      created_at
      updated_at
    }
  }
}

`;

const LOGIN_QUERY = gql`
    query LoginMutation(
        $username: String!
        $password: String!
    ) {
        login (username: $username, password: $password) {
          id
          username
          email
          role
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
          token
          message
        }
    }
`;

export { GET_ALLUSERS_QUERY, GET_ONEUSER_QUERY, LOGIN_QUERY };