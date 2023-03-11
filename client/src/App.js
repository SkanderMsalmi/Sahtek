import React, { Suspense } from 'react';
import styles from "./App.module.scss";
import Footer from './components/Footer/Footer';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Outlet } from 'react-router-dom';
import Navigation from './components/NavBar/Navbar';
import { useLocation } from 'react-router-dom'
import Header from './components/Header/Header';
import { AuthProvider } from './components/AuthProvider/AuthProvider';
import { AuthContext } from './context/AuthContext';
const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql",
  cache: new InMemoryCache()
});
function App() {
const location = useLocation();
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
<Navigation/>
{ location.pathname=="/"?(<Header />):("")}
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
        </AuthProvider>
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