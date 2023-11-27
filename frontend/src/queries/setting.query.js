import { gql } from "@apollo/client";

const GET_SETTING_QUERY = gql`
query getSetting {
    getSetting {
      id
      company_name
      tag_line
      address
      phone
      email
      website
      footer
    }
  }
`;

export { GET_SETTING_QUERY }