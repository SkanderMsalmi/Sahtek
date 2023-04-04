import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import { rootLoader } from './loaders/rootLoader';
import Profile2 from "./pages/Profile/Profile2";
import Rating from "./pages/Rating/Rating";
import VideoCall from "./pages/videoCall/videoCall";
import ProfileCreation from "./pages/Profile/ProfileCreation";

import AlertCheckMail from "./pages/Register/AlertCheckMail";
const Feedback = React.lazy(() => import("./pages/Feedback/Feedback"));
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
const VideoChat = React.lazy(() => import("./pages/videoChat/videoChat"));
const Patients = React.lazy(() => import("./pages/Patients/Patients"));
const PatientFiles = React.lazy(() => import("./pages/Patients/PatientFiles"));
const AppointmentBooked = React.lazy(() => import("./pages/rdv/AppointmentBooked"));
const Rdv = React.lazy(() => import("./pages/rdv/rdv"));
const Appointment = React.lazy(() =>
  import("./pages/AppoinmentForTherapist/appforTherapist")
);
const AppointmentDetails = React.lazy(() =>
  import("./pages/AppoinmentForTherapist/appDetails")
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
        path: "appointmentbooked",
        element: <AppointmentBooked/>,
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
        path: "rating/:id",
        element: <Rating />,
      },
      {
        path: "feedback/:id",
        element: <Feedback />,
      },
      {
        path: "videoCall/:id",
        element: <VideoCall />,
      },
      {
        path: "rdv",
        element: <Rdv/>,
      },
      {
        path: "appfortherapist",
        element: <Appointment />,
      },
      {
        path: "AppoinmentDetails",
        element: <AppointmentDetails />,
      },
      {
        path: "profileCreation",
        element: <ProfileCreation />,
      },
      {
        path: "*",
        exact: true,
        element: <Navigate to="/" />,
      },
      {
        path: "videoChat",
        element: <VideoChat />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "patients/:patientid/files",
        element: <PatientFiles />,
      },
    ],
  },
]);
