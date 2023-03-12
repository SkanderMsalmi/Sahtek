const {gql} = require('apollo-server-express');

module.exports = gql`
enum Role {
  Patient
  Therapist
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  role: Role!
  profileImage: String
  patient:Patient
  therapist:Therapist
}

type Patient {
  id: ID!
  name: String!
  email: String!
  password: String!
  role: Role!
  dateOfBirth: String!
  gender: Gender
  address: Address
  profileImage: String
  phoneNumber: String
  emergencyContact: EmergencyContact
  medicalConditions: [String]
  medications: [Medication]
  appointments:[Appointment]
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
    name: String!
    email: String!
    password: String!
    license: String
    role: Role!
  dateOfBirth: String!
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
            input PatientInput {
                name: String!
                email: String!
                password: String!
                dateOfBirth: String!
                gender: Gender
                role:Role!
                address: AddressInput
                phoneNumber: String
                emergencyContact: EmergencyContactInput
                medicalConditions: [String]
                medications: [MedicationInput]
            }
            input TherapistInput {
                name: String!
                email: String!
                password: String!
                role:Role!
                dateOfBirth: String!
                license: String
                gender: Gender
                specialty: String
                description: String
                availability: String
                education: [String]
                experience: String
                languages: [String]
                fees: Float
            }

            type AuthPayload {
  token: String!
  email:String!
  role:Role!
}
            extend type Query{
       user(ID:ID!): User
       checkEmailExists(email: String!): Boolean!
}
 extend type Mutation {
  registerPatient(patientInput: PatientInput,image: Upload):Patient
  uploadFile(file: Upload!): String!
  registerTherapist(therapistInput: TherapistInput,image: Upload):Therapist
  login(email: String!, password: String!): AuthPayload!
  verifyEmail(id: ID, otp: String): String
     }  
`
