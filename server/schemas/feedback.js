
const {gql} = require('apollo-server-express');

module.exports= gql`
type Feedback {
    id: ID!
    remarks: String!
    consultation: Consultation!
}
extend type Query {
    getFeedbacks: [Feedback]
    getFeedback(id: ID!): Feedback
}
extend type Mutation {
    createFeedback(remarks: String!, consultation: ID!): Feedback
    updateFeedback(id: ID!, remarks: String!): Feedback
    deleteFeedback(id: ID!): Int
}
        `
