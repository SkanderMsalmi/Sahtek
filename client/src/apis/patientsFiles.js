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
        id
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


export const DELETE_PATIENT_FILE_MUTATION  = gql` 
    mutation DeletePatientFile($id: ID!) {
      deletePatientFile(id: $id)
    }
    `;
