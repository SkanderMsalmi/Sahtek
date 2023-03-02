import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import styles from "./App.module.scss";
import{Routes,Route}from'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage/Homepage';
import RegisterPatient from './pages/Signup/Signup'
function App() {

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header/>
      <Footer/>
  </div>
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