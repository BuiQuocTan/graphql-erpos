import { gql } from "@apollo/client";

const GET_ALLPAYNENTPURCHASEINVOICE_QUERY = gql`
query getAllPaymentPurchaseInvoice {
    getAllPaymentPurchaseInvoice {
      allPaymentPurchaseInvoice {
        id
        date
        debit_id
        credit_id
        particulars
        amount
        type
        related_id
        status
        created_at
        updated_at
        debit {
          name
        }
        credit {
          name
        }
      }
      aggregations {
        _count {
          id
        }
        _sum {
          amount
        }
      }
    }
  }
`;

export { GET_ALLPAYNENTPURCHASEINVOICE_QUERY }