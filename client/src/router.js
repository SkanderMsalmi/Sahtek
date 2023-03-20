import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import { rootLoader } from './loaders/rootLoader';
import Profile2 from "./pages/Profile/Profile2";
import ProfileCreation from "./pages/Profile/ProfileCreation";

import AlertCheckMail from "./pages/Register/AlertCheckMail";

const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Forgotpassword = React.lazy(() =>
  import("./pages/forgotPassword/forgotPassword")
);
const Resetpassword = React.lazy(() =>
  import("./pages/ResetPassword/resetPassword")
);
const Homepage = React.lazy(() => import("./pages/Homepage/Homepage"));
const Login = React.lazy(() => import("./pages/Signin/Login"));
const MailVerification = React.lazy(() =>
  import("./pages/Register/MailVerification")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader:rootLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "forgetpassword",
        element: <Forgotpassword />,
      },
      {
        path: "resetpassword",
        element: <Resetpassword />,
      },

      { path: "profile", element: <Profile2 /> },

      { path: "profile/:id", element: <Profile2 /> },

      { path: "profile2", element: <Profile2 /> },
      {
        path: ":userId/verify/:token",
        element: <MailVerification />,
      },
      {
        path: "alertCheckMail",
        element: <AlertCheckMail />,
      },
      {
        path: "forgetpassword",
        element: <Forgotpassword />,
      },
      {
        path: "resetpassword/:userid/:token",
        element: <Resetpassword />,
      },
      {
        path: "profileCreation",
        element: <ProfileCreation/>,
      },
      {
        path: "*",
        exact: true,
        element: <Navigate to="/" />,
      },
    ],
  },
]);
