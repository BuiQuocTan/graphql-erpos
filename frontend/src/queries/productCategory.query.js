import { gql } from "@apollo/client";

const GET_ALLPRODUCTCATEGORY_QUERY = gql`
  query getAllProductCategory(
      $query: String
      $page: Int
      $limit: Int
  ) {
    allProductCategoryData(query: $query, page: $page, count: $limit) {
        id
        name
        createdAt
        updatedAt
        product {
          id
          name
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
  }
`;

const GET_ONEPRODUCTCATEGORY_QUERY = gql`
query getOneCategory($id: Int){
    singleProductCategoryData(id:$id) {
      id
      name
      createdAt
      updatedAt
      product {
        id
        name
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
  }
`

export { GET_ALLPRODUCTCATEGORY_QUERY, GET_ONEPRODUCTCATEGORY_QUERY };