import { gql } from "@apollo/client";

const GET_ALLPRODUCT_QUERY = gql`
  query getAllProducts(
      $query: String,
      $page: Int,
      $limit: Int,
      $prod: String,
      $status: String
  ) {
    allProductsData(query:$query, status:$status, page:$page, count:$limit, prod: $prod) {
      allProducts {
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
        product_category {
          name
        }
        imageUrl
    }
    aggregations {
        _count{
       id
     }
     _sum{
       quantity
     },
     totalPurchasePrice
     totalSalePrice
   }
  }
}
`;

const GET_ONEPRODUCT_QUERY = gql`
query getSingleProduct(
    $id: Int
) {
  singleProductData(id:$id) {
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

export { GET_ALLPRODUCT_QUERY, GET_ONEPRODUCT_QUERY }