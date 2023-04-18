const { gql } = require("apollo-server-express");
module.exports = gql`
  type Product {
    id: ID
    name: String
    description: String
    category: String
    stock: Int
    image: String
    price: Float
  }
  input ProductInput {
    name: String
    description: String
    category: String
    stock: Int
    price: Float
    image: String
  }
  type Query {
    getProduct(ID: ID!): Product
    getAllProducts: [Product]
    getCategories: [String]
  }
  type Mutation {
    addProduct(productInput: ProductInput): Product
    updateProduct(id: ID!, productInput: ProductInput): Product
    deleteProduct(id: ID!): String
  }
`;
