const {gql} = require('apollo-server-express');
module.exports = gql`
type Community {
  id: ID!
  name: String
  createdAt: String
  description: String
  members: [User]
  creator: User
  posts: [Post]
  color: String
   
}
 

extend type Query {
    community(id: ID!): Community
    getAllCommunities: [Community]
    findCommunityByUser(id: ID!): [Community]
  
}
extend type Mutation {
  createCommunity(name: String!, description: String!, creator: ID!): Community
  updateCommunity(id: ID!,name: String,  description: String): Community
    deleteCommunity(id: ID!): String
    joinCommunity(id: ID!, userId: ID!): Community
    leaveCommunity(id: ID!, userId: ID!): Community
   
}

    
`

       
