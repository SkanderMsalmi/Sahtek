import { gql, useQuery } from "@apollo/client";

const CURRENT_QUERRY = gql`
  query Current($token: String!) {
    current(token: $token) {
      email
    }
  }
`;
export async function GetCurrentUser() {
  const response = useQuery(CURRENT_QUERRY, {
    variables: {
      token: localStorage.getItem("token"),
    },
  });
  return response.current;
}
