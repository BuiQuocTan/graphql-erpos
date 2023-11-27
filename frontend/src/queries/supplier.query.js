import { gql } from "@apollo/client";

const GET_ALLSUPPLIER_QUERY = gql`
query getAllSuppliers($query: String, $status: String, $page: Int, $limit: Int) {
    allSuppliersData(
        query: $query,
        status: $status,
        page: $page,
        count: $limit
    ) {
      allSuppliers{
            id
            name
            phone
            address
            status
            created_at
            updated_at
        purchaseInvoice{
                id
                date
                total_amount
                discount
                paid_amount
                due_amount
                supplier_id
                note
                supplier_memo_no
                created_at
                updated_at
            }
            due_amount
        allReturnPurchaseInvoice{
                id
                date
                total_amount
                note
                purchaseInvoice_id
                status
                created_at
                updated_at
            }
        allTransaction{
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
          credit{
                    name
                }
          debit{
                    name
                }
            }
        }
            aggregations{
                _count{
                id
                }
            }
    }
}
`;

const GET_ONESUPPLIER_QUERY = gql`
query getSigleSupplier($id: Int) {
    getSingleSupplier(
      id: $id
    ) {
        id
        name
        phone
        address
        status
        created_at
        updated_at
        count
        purchaseInvoice{
          id
          date
          total_amount
          discount
          paid_amount
          due_amount
          supplier_id
          note
          supplier_memo_no
          created_at
          updated_at
        }
        due_amount
        allReturnPurchaseInvoice{
          id
          date
          total_amount
          note
          purchaseInvoice_id
          status
          created_at
          updated_at
        }
        allTransaction{
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
          credit{
            name
          }
          debit{
            name
          }
        }
    }
  }
`;

export { GET_ALLSUPPLIER_QUERY, GET_ONESUPPLIER_QUERY };