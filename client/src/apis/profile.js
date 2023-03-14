import { gql } from "@apollo/client";

export const USER_PROFILE = gql`{
    query User($id: ID!) {

    user(ID: $id) {
        email
        name
        password
        profileImage
        role
      }
      
      }
    `
