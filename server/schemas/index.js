const { gql } = require("apollo-server-express");
const ConsultationType = require("./consultation");
const FeedbackType = require("./feedback");
const patientFile = require("./patientFile");
const postT = require("./post");
const commentT = require("./comment");
const userT = require("./user");
const ProductT = require("./product");
const verificationToken = require("./verificationToken");
const ratingT = require("./rating");
const communityT = require("./community");
const chatbotT = require("./chatbot");
const rootType = gql`
  scalar Upload
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [
  rootType,
  ConsultationType,
  FeedbackType,
  patientFile,
  postT,
  commentT,
  userT,
  ProductT,
  verificationToken,
  ratingT,
  communityT,
  chatbotT,
];
