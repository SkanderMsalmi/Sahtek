import React from 'react';
import styles from "./App.module.scss";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Signin/Login';
import Register from './pages/Register/Register';
function App() {

  return (
    <>
      <Header/>
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Login/>
  </div>
      <Footer/>
  </>
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