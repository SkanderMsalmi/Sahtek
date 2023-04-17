const {gql} = require('apollo-server-express');
module.exports = gql`
type Post {
    id: ID!
    description: String
    time: String
    title: String
    community: Community
    like: User    
    user: User
    commentsCount: Int!
    likesCount: Int!
    isLiked(  user: ID!): Boolean
    isPostedByCurrentuser(  user: ID!): Boolean
   
}
type Community {
    id: ID!
    name: String
    createdAt: String
    description: String 
    members: [User]
   
     
  }

input PostInput {
        description: String
        user: ID
        title: String
        community: String
    }  

extend type Query {
    getPost(id: ID!,user: ID!): Post
    getAllPosts(  user: ID!): [Post]
    findPostByUser(id: ID!): [Post]


    community(id: ID!): Community
    getAllCommunities: [Community]
  
       
}

extend type Mutation {
    createPost(postInput: PostInput): Post
    updatePost(id: ID!, postInput: PostInput): Post
    deletePost(id: ID!): String
    LikePost(id: ID!, user:ID!): Post
    removeLikePost(id: ID!, user: ID!): Post

    createCommunity(name: String!, description: String!): Community
    updateCommunity(id: ID!,  description: String): Community
    deleteCommunity(id: ID!): String
    joinCommunity(id: ID!, userId: ID!): Community
}    
`

       
