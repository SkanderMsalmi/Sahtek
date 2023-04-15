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
    gender: Gender
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
    address: Address
    phoneNumber: String
    profileImage: String
    emergencyContact: EmergencyContact
    medicalConditions: [String]
    medications: [Medication]
  }

  enum Gender {
    Male
    Female
    Other
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
    licenses: [License]
    dateOfBirth: String
    profileImage: String
    specialties: [String!]
    description: String
    availability: [Availability]
    address: Address
    phoneNumber: String
    education: [String]
    experience: String
    languages: [String]
    fees: Float
    ratings: [Float]
    reviews: [String]
  }

  type Appointment {
    id: ID
    patient: User
    therapist: User
    date: String
    duration: Int
    notes: String
    status: String
  }
  input AppointmentInput {
    patient: ID!
    therapist: ID!
    date: String
    duration: Int
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
    gender: Gender!
    role: Role!
  }
  input UserUpdateInput {
    id: ID!
    name: String
    dateOfBirth: String
    password: String
    oldPassword: String
  }

  type AuthPayload {
    token: String
    user: User
  }
  type TherapistPayload {
    user: User
    rating: Int
  }
  input TherapistInput {
    id: ID!
    licenses: [LicenseInput]
    specialties: [String]
    description: String
    availability: [AvailabilityInput]
    address: AddressInput
    phoneNumber: String
    education: [String]
    experience: String
    languages: [String]
    fees: Float
    ratings: [Float]
    reviews: [String]
  }
  enum LicenseType {
    Major
    Minor
  }

  input LicenseInput {
    typeL: LicenseType
    license: String
    state: String
  }
  type License {
    typeL: LicenseType
    license: String
    state: String
  }
  input AvailabilityInput {
    day: String
    startTime: String
    endTime: String
  }
  type Availability {
    day: String
    startTime: String
    endTime: String
  }
  input AdressInput {
    street: String
    city: String
    state: String
    zip: String
  }
  extend type Query {
    user(ID: ID!): User
    therapist(ID: ID!): TherapistPayload
    users: [User]
    checkEmailExists(email: String!): Boolean!
    current(token: String!): User
    getAppointment(ID: ID!): Appointment
    getAppointmentsByTherapist(therapist: ID!): [Appointment]
    getAppointments: [Appointment]
    getPatientsByTherapist(id: ID!): [User]
    getAppointmentsByPatient(ID: ID!): [Appointment]
    getTherapistsByPatient(ID: ID!): [User]
  }
  extend type Mutation {
    register(userInput: UserInput, image: Upload): User
    login(email: String!, password: String!): AuthPayload!
    verifyEmail(id: ID, otp: String): String
    update(userInput: UserUpdateInput, image: Upload): User
    updateTherapist(therapistInput: TherapistInput): User
    resetPassword(email: String!): Boolean
    resetPasswordlink(
      userid: String!
      token: String!
      newpassword: String!
    ): Boolean
    resendMailVerification(id: ID): String
    bookAppointment(
      patient: ID
      therapist: ID
      date: String
      duration: Int
      notes: String
      status: String
    ): Boolean
    AcceptAppointment(idAppointment: ID): Boolean
  }
`;
