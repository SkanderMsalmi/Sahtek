import { gql } from "@apollo/client";


export const GET_PATIENTS = gql` 
query GetPatientsByTherapist($id: ID!) {
  getPatientsByTherapist(id: $id) {
    id
    email
    name
    profileImage
    dateOfBirth
  }
} 
`;

export const GET_PATIENT_FILES = gql` 
    query GetFilesByPatient($id: ID!) {
      getFilesByPatient(id: $id) {
        createdAt
        patient {
          id
          name
        }
        remarks
        title
      }
    } 
    `;

export const GET_USER = gql` 

    query User($id: ID!) {
      user(ID: $id) {
        dateOfBirth
        email
        gender
        name
        id
        profileImage
      }
    }
    `;

