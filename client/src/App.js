import React, { Suspense } from "react";
import Footer from "./components/Footer/Footer";
import { ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Navigation from "./components/NavBar/Navbar";
import { useLocation } from "react-router-dom";
import AnimatedHeader from "./components/Header/AnimatedHeader";
import client from "./apis/apolloClient";
import store, { Persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ContextProvider } from "./apis/socketContext";
import { PeerProvider } from "./apis/peerContext";
import style from "./App.module.scss"
// import AnimatedHeader from './components/Header/AnimatedHeader';

function App() {
  const location = useLocation();
  if (location.pathname.startsWith("/videoCall"))
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ContextProvider>
            <PeerProvider>
              <PersistGate loading={null} persistor={Persistor}>
                <div className="flex-fill d-flex flex-column">
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </div>
              </PersistGate>
            </PeerProvider>
          </ContextProvider>
        </Provider>
      </ApolloProvider>
    );
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <div className={style.appContainer}>
          <Navigation />
          {location.pathname == "/" ? <AnimatedHeader /> : ""}
          
            <Suspense >
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
