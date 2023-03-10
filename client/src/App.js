import React, { Suspense } from 'react';
import styles from "./App.module.scss";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Outlet } from 'react-router-dom';
import Navigation from './components/NavBar/Navbar';
import { useLocation } from 'react-router-dom'
const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql",
  cache: new InMemoryCache()
});
function App() {

  return (
    <ApolloProvider client={client}>
<Navigation/>
{ useLocation().pathname==""?(<Header />):("")}
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
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