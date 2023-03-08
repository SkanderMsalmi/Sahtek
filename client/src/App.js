import React from 'react';
import styles from "./App.module.scss";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/RegisterPatient';
 import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql",
  cache: new InMemoryCache()
});
function App() {

  return (
    <ApolloProvider client={client}>

    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header/>
      <Register/>
      <Footer/>
  </div>
  </ApolloProvider>
  );
}

export default App;
  //  {/* <AuthProvider> */}
  //  <Header />
  //  <div className="flex-fill">
  //    <Suspense>
  //      <Outlet />
  //    </Suspense>
  //  </div>
  //  <Footer />
  //  {/* </AuthProvider> */}