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



