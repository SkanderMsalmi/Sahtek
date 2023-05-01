const { gql } = require("apollo-server-express");
module.exports = gql`
  type Query {
    chatbot(input: ChatbotInput!): ChatbotResponse!
  }

  input ChatbotInput {
    text: String!
  }

  type ChatbotResponse {
    type: String
    text: String
  }
`;
