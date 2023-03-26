const { gql } = require("apollo-server-express");
module.exports = gql`
  type Rating {
    _id: ID
    patient: ID!
    therapist: ID!
    rating: Float
  }
  extend type Query {
    getRating(id: ID!): Rating
  }
  extend type Mutation {
    makeRating(patient: ID!, therapist: ID!, rating: Float): Rating
    deleteRating(id: ID!): Int
  }
`;
