const { gql } = require("apollo-server-express");
module.exports = gql`
  type Feedback {
    _id: ID
    patient: ID!
    therapist: ID!
    communication: Int!
    empathy: Int!
    professionalism: Int!
    effectiveness: Int!
    remarks: String
  }

  extend type Query {
    getFeedbacks: [Feedback]
    getFeedback(id: ID!): Feedback
  }
  extend type Mutation {
    createFeedback(
      patient: ID!
      therapist: ID!
      communication: Int!
      empathy: Int!
      professionalism: Int!
      effectiveness: Int!
      remarks: String
    ): Feedback
    updateFeedback(id: ID!, remarks: String!): Feedback
    deleteFeedback(id: ID!): Int
  }
`;
