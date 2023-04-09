const {gql} = require('apollo-server-express');
module.exports = gql`
type Comment {
    id: ID!
    description: String
    time: String
    post: Post
    user: User
}
    input CommentInput {
        description: String
    
    }  
extend type Query {
    getComment(ID: ID!): Comment
    getAllComments: [Comment]
    getCommentsByPostId(id: ID!): [Comment]
 
}
extend type Mutation {
    createComment(CommentInput: CommentInput!, post: ID!, user: ID!): Comment
    updateComment(id: ID!, CommentInput: CommentInput): Comment
    deleteComment(id: ID!, post: ID!): String
    
}    
`

       
