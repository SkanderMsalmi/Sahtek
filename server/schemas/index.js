const { gql } = require("apollo-server-express");
const ConsultationType = require("./consultation")
const FeedbackType = require("./feedback");
const patientFile = require("./patientFile");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports= [
    rootType,
    ConsultationType,
    FeedbackType,
    patientFile
]