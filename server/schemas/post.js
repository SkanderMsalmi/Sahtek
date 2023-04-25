const {gql} = require('apollo-server-express');
module.exports = gql`
type Post {
    id: ID!
    description: String
    time: String
    title: String
    community: Community
    like: [User]    
    user: User
    comments: [Comment]
    isLiked(  user: ID!): Boolean
    isPostedByCurrentuser(  user: ID!): Boolean
   
}

type Question {
    title: String!
    similarity: Float!
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
    findPostByUserCommunities(id: ID!): [Post]
    findPostByCommunity(id: ID!): [Post]
  
    similarQuestions(newQuestion: String): [Question]

    


 
  
    

  
       
}

extend type Mutation {
    createPost(postInput: PostInput): Post
    updatePost(id: ID!, postInput: PostInput): Post
    deletePost(id: ID!): String
    LikePost(id: ID!, user:ID!): Post
    removeLikePost(id: ID!, user: ID!): Post

    

}    
`

        
