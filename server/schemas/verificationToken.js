const {gql} = require('apollo-server-express');

module.exports = gql`
type verificationToken {
    userId: User
    token: String,
    createdAt: String
}

input VerificationTokenInput {
    userId: Int
    token: String

}  
extend type Query {
    getverificationToken(verificationTokenInput: VerificationTokenInput): verificationToken
        
}`