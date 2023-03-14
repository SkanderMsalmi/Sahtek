import React, { Suspense, useEffect } from "react";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Navigation from "./components/NavBar/Navbar";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import client from "./apis/apolloClient";
import store, { Persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import AnimatedHeader from './components/Header/AnimatedHeader';

function App() {
  const location = useLocation();

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <Navigation />
          {location.pathname == "/" ? <Header /> : ""}
          <div className="flex-fill d-flex flex-column">
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </PersistGate>
      </Provider>
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
