const {gql} = require('apollo-server-express');

module.exports = gql`
    type Consultation {
        id: ID!
        date: String!
        time: String!
        patientFile: PatientFile
        feedback: Feedback
    }
    extend type Query {
        getConsultations: [Consultation]
        getConsultation(id: ID!): Consultation
    }
    extend type Mutation {
        createConsultation(date: String!, time: String!, patientFile: ID, feedback: ID): Consultation
        updateConsultation(id: ID!, date: String!, time: String!): Consultation
        deleteConsultation(id: ID!): Int
    }    
    `

       

