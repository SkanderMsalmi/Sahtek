const { gql } = require('apollo-server-express');
module.exports = gql`
type Product {
    id: ID,
    name: String,
    description: String,
    category:String
    stock: Int,
    price:Float,
    image:String
}
input ProductInput {
    name: String,
    description: String,
    category:String
    stock: Int,
    price:Float
    id: ID
}  
type Query {
    getProduct(ID: ID!): Product
    getAllProducts: [Product]
}
type Mutation {
    addProduct(productInput: ProductInput, image: Upload): Product
    updateProduct( productInput: ProductInput,img: Upload): Product
    deleteProduct(id: ID!): String
}    
`
