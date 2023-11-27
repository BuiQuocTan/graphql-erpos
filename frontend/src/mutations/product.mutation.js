import { gql } from "@apollo/client";

const CREATE_PRODUCT_MUTATION = gql`
mutation ($query: String, $name: String, $purchase_price: Float, $quantity: Int, $sale_price: Float, $product_category_id: Int, $sku: String, $unit_measurement: Float, $unit_type: String, $reorder_quantity: Int, $ids: [Int], $imageName: String, $incomeProducts: [IncomeProduct]) {
    createProduct(query: $query, name: $name, purchase_price: $purchase_price, quantity: $quantity, sale_price: $sale_price, product_category_id: $product_category_id, sku: $sku, unit_measurement: $unit_measurement, unit_type: $unit_type, reorder_quantity: $reorder_quantity, ids: $ids, imageName: $imageName incomeProducts: $incomeProducts) {
      id
      name
      quantity
      purchase_price
      sale_price
      imageName
      product_category_id
      unit_measurement
      unit_type
      sku
      reorder_quantity
      status
      created_at
      updated_at
      imageUrl
      count
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
mutation updateOneProduct($id: Int, $name: String, $quantity: Int, $purchase_price: Float, $sale_price: Float) {
    updateSingleProduct(
      id: $id,
      name: $name,
      quantity: $quantity,
      purchase_price: $purchase_price,
      sale_price: $sale_price
    ) {
      id
      name
      quantity
      purchase_price
      sale_price
      imageName
      product_category_id
      unit_measurement
      unit_type
      sku
      reorder_quantity
      status
      created_at
      updated_at
      imageUrl,
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
mutation deleteOneProduct($id: Int, $status: Boolean) {
    deleteSingleProduct(
      id: $id,
     status: $status
    ) {
      id
      name
      quantity
      purchase_price
      sale_price
      imageName
      product_category_id
      unit_measurement
      unit_type
      sku
      reorder_quantity
      status
      created_at
      updated_at
      imageUrl
    }
}
`;

export { CREATE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION, DELETE_PRODUCT_MUTATION }