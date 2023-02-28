const {gql} = require('apollo-server-express');

module.exports = gql`
type User {
    name : String
    email : String
    password : String
    token : String
}

input RegisterInput {
    name: String
    email: String
    password: String
}

input LoginInput {
    email: String
    password: String
}

extend type Query{
    user(id: ID!):User
}

extend type Mutation {
    registerUser(registerInput : RegisterInput): User
    loginUser(loginInput: LoginInput): User
} 

`