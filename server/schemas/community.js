const {gql} = require('apollo-server-express');
module.exports = gql`
type Community {
  id: ID!
  name: String
  createdAt: String
  description: String 
  members: [User]
 
   
}
 

extend type Query {
    community(id: ID!): Community
    getAllCommunities: [Community]
  
}
extend type Mutation {
    createCommunity(name: String!, description: String!): Community
    updateCommunity(id: ID!, name: String, description: String): Community
    deleteCommunity(id: ID!): Community
    joinCommunity(id: ID!, userId: ID!): Community
   
}

    
`

       
