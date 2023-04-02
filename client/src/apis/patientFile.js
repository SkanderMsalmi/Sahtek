import { gql } from "@apollo/client";

export const GET_PATIENT_FILE = gql
`query GetPatientFile($getPatientFileId: ID!) {
    getPatientFile(id: $getPatientFileId) {
      id
      remarks
      consultation {
        date
      }
    }
  }`;

  export const CREATE_PATIENT_FILE_MUTATION = gql

`
  mutation CreatePatientFile($remarks: String!, $consultation: ID!) {
    createPatientFile(remarks: $remarks, consultation: $consultation) {
      id
      remarks
      consultation {
        _id
        date
        time
      }
       
    }
  }`