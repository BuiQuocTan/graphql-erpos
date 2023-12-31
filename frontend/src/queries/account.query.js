import { gql } from "@apollo/client";

const GET_ALLACCOUNTS_QUERY = gql`
query getAllAccounts($query: String) {
	getAllAccounts(query:$query) {
    match
    totalDebit
    totalCredit
    totalAsset
    totalLiability
    totalEquity
    debits{
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
    credits{
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
    entire{
      id
      name
      type
      account_id
      status
      account{
        name
        type
      }
      subAccount{
        id
        name
        account_id
        status
        debit{
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
        }
        credit{
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
        }
        balance
      }
    }
    assets{
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
    liabilities{
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
    equity{
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
    totalRevenue
    totalExpense
    profit
    revenue{
      id
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
    expense{
      id
      account
      subAccount
      totalDebit
      totalCredit
      balance
    }
  }
}
`;

const GET_ONEACCOUNT_QUERY = gql`
query getOneAccount($id: Int) {
    getSingleAccount(id: $id) {
      id
      name
      account_id
      status
      debit {
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
      }
      credit {
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
      }
      balance
    }
  }
  
`;

export { GET_ALLACCOUNTS_QUERY, GET_ONEACCOUNT_QUERY };