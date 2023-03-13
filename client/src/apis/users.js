import gql from "graphql-tag";


export const REGISTER_PATIENT_MUTATION = gql`
  mutation RegisterPatient($patientInput: PatientInput) {
  registerPatient(patientInput: $patientInput) {
    
    role
   
  }
}
`;
export const REGISTER_THERAPIST_MUTATION = gql`
mutation RegisterTherapist($therapistInput: TherapistInput) {
  registerTherapist(therapistInput: $therapistInput) {
    role
    email
  }
}
`;
export const VERIFY_TOKEN_MUTATION = gql`
mutation VerifyToken($verificationTokenInput: VerificationTokenInput, $userId: ID) {
  verifyToken(verificationTokenInput: $verificationTokenInput, userId: $userId)
}
`;

