const {gql} = require('apollo-server-express');

module.exports = gql`
type Product {
    name: String,
    description: String,
    category:String
    stock: Int,
    price:Float
}
input ProductInput {
    name: String,
    description: String,
    category:String
    stock: Int,
    price:Float
}  
type Query {
    getProduct(ID: ID!): Product
    getAllProducts: [Product]
       
}
type Mutation {
    addProduct(productInput: ProductInput): Product
    updateProduct(id: ID!, productInput: ProductInput): Product
    deleteProduct(id: ID!): String
}    
`
