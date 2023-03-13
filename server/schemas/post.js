const {gql} = require('apollo-server-express');
module.exports = gql`
type Post {
    description: String,
    time: String,
    like: Int,
    user: User
}
    input PostInput {
        description: String
        user: ID
    }  
extend type Query {
    getPost(ID: ID!): Post
    getAllPosts: [Post]
    findPostByUser(id: ID!): [Post]
       
}
extend type Mutation {
    createPost(postInput: PostInput): Post
    updatePost(id: ID!, postInput: PostInput): Post
    deletePost(id: ID!): String
}    
`

       
