const {gql} = require('apollo-server-express');

module.exports = gql`
type Post {
    description: String,
    time: String,
    like: Int
}

input PostInput {
    description: String
}  
extend type Query {
    getPost(ID: ID!): Post
    getAllPosts: [Post]
       
}
extend type Mutation {
    createPost(postInput: PostInput): Post
    updatePost(id: ID!, postInput: PostInput): Post
    deletePost(id: ID!): String
}    
`

       
