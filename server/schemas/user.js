const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Role {
    Patient
    Therapist
  }

  type User {
    id: ID!
    verified: Boolean
    name: String!
    email: String!
    password: String!
    role: Role!
    dateOfBirth: String!
    profileImage: String
    patient: Patient
    therapist: Therapist
  }

  type Patient {
    id: ID!
    name: String
    email: String!
    password: String!
    dateOfBirth: String
    gender: Gender
    address: Address
    profileImage: String
    phoneNumber: String
    emergencyContact: EmergencyContact
    medicalConditions: [String]
    medications: [Medication]
    appointments: [Appointment]
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }
  type Address {
    street: String
    city: String
    state: String
    zip: String
  }
  type EmergencyContact {
    name: String
    phoneNumber: String
  }
  type Medication {
    name: String
    dosage: String
  }
  input AddressInput {
    street: String
    city: String
    state: String
    zip: String
  }

  input EmergencyContactInput {
    name: String
    phoneNumber: String
  }

  input MedicationInput {
    name: String!
    dosage: String!
  }

  type Therapist {
    id: ID!
    name: String
    email: String!
    password: String!
    license: String
    dateOfBirth: String
    profileImage: String
    specialties: [String!]
    description: String
    availability: String
    education: [String]
    experience: String
    languages: [String]
    fees: Float
    ratings: [Float]
    reviews: [String]
    appointments: [Appointment]
  }

  type Appointment {
    id: ID!
    patient: Patient!
    therapist: Therapist!
    startTime: String!
    endTime: String!
    duration: Int!
    notes: String
    status: String
  }

  type Token {
    value: String!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    dateOfBirth: String!
    role: Role!
  }

  type AuthPayload {
    token: String
    user: User
  }
  extend type Query {
    user(ID: ID!): User
    checkEmailExists(email: String!): Boolean!
    current(token: String!): User
  }
  extend type Mutation {
    register(userInput: UserInput, image: Upload): User
    login(email: String!, password: String!): AuthPayload!
    verifyEmail(id: ID, otp: String): String
    resetPassword(email: String!): Boolean
    resetPasswordlink(
      userid: String!
      token: String!
      newpassword: String!
    ): Boolean
    resendMailVerification(id: ID): String
  }
`;
