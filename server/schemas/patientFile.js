const { gql } = require('apollo-server-express');
module.exports = gql`
type PatientFile {
    id: ID!
    title: String
    remarks: String!
     patient: User!
    therapist: User!
    createdAt: String



}
extend type Query {
    getPatientFiles: [PatientFile]
    getPatientFile(id: ID!): PatientFile
    getFilesByTherapist(id: ID!): [PatientFile]

}
extend type Mutation {
    createPatientFile(title: String, remarks: String!,patient: ID!,
    therapist: ID! ): PatientFile
    updatePatientFile(id: ID!, remarks: String!): PatientFile
    deletePatientFile(id: ID!): Int
}`

