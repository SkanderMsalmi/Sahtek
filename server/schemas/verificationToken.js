const {gql} = require('apollo-server-express');

module.exports = gql`
type verificationToken {
    userId: User
    token: String,
    createdAt: String
}

input VerificationTokenInput {
    
    token: String

}  
extend type Mutation {
    verifyToken(verificationTokenInput: VerificationTokenInput, userId: ID): String
    verifyTokenforpassword(VerificationTokenInput :VerificationTokenInput,userId: ID):String
}`