const {gql} = require('apollo-server-express');

module.exports = gql`
type PatientFile {
    id: ID!
    remarks: String!
    consultation: Consultation!
}
extend type Query {
    getPatientFiles: [PatientFile]
    getPatientFile(id: ID!): PatientFile
}
extend type Mutation {
    createPatientFile(remarks: String!, consultation: ID!): PatientFile
    updatePatientFile(id: ID!, remarks: String!): PatientFile
    deletePatientFile(id: ID!): Int
}
        `

