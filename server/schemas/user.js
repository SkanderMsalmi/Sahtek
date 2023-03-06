const {gql} = require('apollo-server-express');

module.exports = gql`
    type Patient {
        name: String!
        email: String!
        password: String!
        dateOfBirth: String!
        gender: Gender
        address: Address
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
    license: String!
    specialty: String!
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
                confirmPassword: String!
                license: String!
                specialty: String!
                description: String
                availability: String
                education: [String]
                experience: String
                languages: [String]
                fees: Float
            }

            
union User = Patient | Therapist

extend type Query{
  user(id:ID!): User
  getCurrectUser: User
    patient(ID: ID!): Patient
    therapist(ID: ID!):Therapist
    appoitmentsPatient(id: ID!):Patient
    appoitmentsTherapist(id: ID!):Therapist
}

extend type Mutation {
    registerPatient( name: String!,email: String!,password: String!,dateOfBirth: String!): Patient
    registerTherapist(therapistInput : TherapistInput): Therapist
    login(email: String!, password: String!, userType: String!): String
    
} 

`


// query {
//     patient(id: "123") {
//       id
//       name
//       appointments {
//         id
//         date
//         time
//         therapist {
//           name
//         }
//       }
//     }
//   }