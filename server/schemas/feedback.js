const { gql } = require("apollo-server-express");
module.exports = gql`
  type Feedback {
    _id: ID
    patient: ID!
    therapist: ID!
    communication: Float!
    empathy: Float!
    professionalism: Float!
    effectiveness: Float!
    remarks: String
  }
  type FeedbackPayload {
    therapist: User
    feedback: Feedback
  }
  extend type Query {
    getFeedbacks: [Feedback]
    getFeedback(id: ID!): Feedback
    checkFeedbackForPatientAndTherapist(
      patient: ID
      therapist: ID
    ): FeedbackPayload
  }
  extend type Mutation {
    createFeedback(
      patient: ID!
      therapist: ID!
      communication: Float!
      empathy: Float!
      professionalism: Float!
      effectiveness: Float!
      remarks: String
    ): Boolean
    updateFeedback(id: ID!, remarks: String!): Feedback
    deleteFeedback(id: ID!): Int
  }
`;
