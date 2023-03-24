import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const persistRoot = JSON.parse(localStorage.getItem("persist:main-root"));
  // const { token } = JSON.parse(persistRoot.token);
  const data = JSON.parse(persistRoot.user);
  const token = data.token;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: "http://localhost:5000/graphql",
    })
  ),
  cache: new InMemoryCache(),
});

export default client;
