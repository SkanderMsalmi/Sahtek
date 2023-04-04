import { gql } from "@apollo/client";



export const GET_PATIENT_FILES = gql` 
query GetFilesByPatient($id: ID!) {
  getFilesByPatient(id: $id) {
    id
    patient {
      email
      name
      id
    }
    remarks
    title
    createdAt
  }
} 
    `;


    export const GET_FILE = gql` 
    query GetPatientFile($id: ID!) {
      getPatientFile(id: $id) {
        id
        remarks
        title
        createdAt
        
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
        patient {
          phoneNumber
        }
      }
    }
    `;


export const DELETE_PATIENT_FILE_MUTATION = gql
` 
mutation DeletePatientFile($id: ID!) {
  deletePatientFile(id: $id) 
}
    `;


 
export const CREATE_PATIENT_FILE_MUTATION = gql

  `
  mutation CreatePatientFile($remarks: String!, $patient: ID!, $therapist: ID!, $title: String) {
    createPatientFile(remarks: $remarks, patient: $patient, therapist: $therapist, title: $title) {
      id
      remarks
      patient {
        id
        email
      }
      therapist {
        id
        email
      }
      createdAt
    }
  }
  `;    


  export const UPDATE_PATIENT_FILE_MUTATION = gql
  ` 
  mutation UpdatePatientFile($id: ID!, $remarks: String!, $title: String) {
    updatePatientFile(id: $id, remarks: $remarks, title: $title) {
      id
      title
      remarks
    }
  }
      `;
  
  
 