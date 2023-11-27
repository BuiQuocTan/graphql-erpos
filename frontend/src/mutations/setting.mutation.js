import { gql } from "@apollo/client";

const UPDATE_SETTING_MUTATION = gql`
mutation updateSetting($company_name: String, $tag_line: String, $address: String, $phone: String, $email: String, $website: String, $footer: String){
    updateSetting(
      company_name: $company_name,
      tag_line: $tag_line,
      address: $address,
      phone: $phone,
      email: $email,
      website: $website,
      footer: $footer
    ) {
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

export { UPDATE_SETTING_MUTATION }