import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation Register($userInput: UserInput) {
    register(userInput: $userInput) {
      email
      password
      role
      verified
      name
    }
  }
`;
export const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyToken(
    $verificationTokenInput: VerificationTokenInput
    $userId: ID
  ) {
    verifyToken(
      verificationTokenInput: $verificationTokenInput
      userId: $userId
    )
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
        verified
        profileImage
        therapist {
          id
          description
        }
        patient{
          id
        }
        
      }
    }
  }
`;
export const RESEND_MAIL_VERIFICATION_MUTATION = gql`
  mutation ResendMailVerification($resendMailVerificationId: ID) {
    resendMailVerification(id: $resendMailVerificationId)
  }
`;


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
