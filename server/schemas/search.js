const {gql} = require('apollo-server-express');
module.exports = gql`

  type Query {
    compareImages(image1_path: String): [Product]
  }
`;