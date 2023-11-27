import { gql } from "@apollo/client";

const GET_DASHBOARDDATA_QUERY = gql`
  query getDashboardData(
      $startdate: String!
      $enddate: String!
  ) {
    dashboardData (startdate: $startdate, enddate: $enddate) {
      saleProfitCount {
          type
          date
          amount
        }
        SupplierVSCustomer {
          type
          value
        }
        customerSaleProfit {
          label
          type
          value
        }
        cardInfo {
          purchase_count
          purchase_total
          sale_count
          sale_total
          sale_profit
        }
    }
  }
`;

export { GET_DASHBOARDDATA_QUERY };