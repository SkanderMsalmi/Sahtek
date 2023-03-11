import gql from "graphql-tag";


export const REGISTER_MUTATION = gql`
mutation Register($userInput: UserInput) {
  register(userInput: $userInput) {
    email
    password
    role
    patient {
      name
    }
    
  }
}
`;

export  const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
      email
      patient {
        name
      }
    }
    token
  }
  }
`;


