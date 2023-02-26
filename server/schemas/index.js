const { gql } = require("apollo-server-express");
const postT = require("./post")
const commentT = require("./comment")

 

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports= [
    rootType,
    postT,
    commentT
     
]