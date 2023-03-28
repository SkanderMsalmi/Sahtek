import { gql } from "@apollo/client";

 
export const GET_PATIENTS_FILES = gql` 
query GetFilesByTherapist($id: ID!) {
  getFilesByTherapist(id: $id) {
    id
    title
    remarks
    patient {
      id
      email
      name
    }
    createdAt
  }
}
    
    `;
