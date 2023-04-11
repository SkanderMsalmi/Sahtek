import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import EspacePatient from "./pages/EspaceUser/EspacePatient";
import EspaceTherapist from "./pages/EspaceUser/EspaceTherapist";
import PatientDashboard from "./components/EspaceUser/Patient/PatientDashboard";
import PatientAppointments from "./components/EspaceUser/Patient/PatientAppointments";
import PatientTherapist from "./components/EspaceUser/Patient/PatientTherapist";
import TherapistDashboard from "./components/EspaceUser/Therapist/TherapistDashboard";
import TherapistAppointments from "./components/EspaceUser/Therapist/TherapistAppointments";
import TherapistSettings from "./components/EspaceUser/Therapist/TherapistSettings";
import TherapistPatients from "./components/EspaceUser/Therapist/TherapistPatients";
import PatientSettings from "./components/EspaceUser/Patient/PatientSettings";

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import { rootLoader } from './loaders/rootLoader';
const TimeTable = React.lazy(() => import("./components/Calender/TimeTable"));
const Homepage = React.lazy(() => import("./pages/Homepage/Homepage"));

//Feedback
const Rating = React.lazy(() => import("./pages/Rating/Rating"));
const Feedback = React.lazy(() => import("./pages/Feedback/Feedback"));
// Consultation
const VideoCall = React.lazy(() => import("./pages/videoCall/videoCall"));
const VideoChat = React.lazy(() => import("./pages/videoChat/videoChat"));
const Rdv = React.lazy(() => import("./pages/rdv/Rdv"));
const Appointment = React.lazy(() =>
  import("./pages/AppoinmentForTherapist/appforTherapist")
);
const AppointmentDetails = React.lazy(() =>
  import("./pages/AppoinmentForTherapist/appDetails")
);

// User Managament
const ProfileCreation = React.lazy(() =>
  import("./pages/Profile/ProfileCreation")
);
const AlertCheckMail = React.lazy(() =>
  import("./pages/Register/AlertCheckMail")
);
const Profile2 = React.lazy(() => import("./pages/Profile/Profile2"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Forgotpassword = React.lazy(() =>
  import("./pages/forgotPassword/forgotPassword")
);
const Resetpassword = React.lazy(() =>
  import("./pages/ResetPassword/resetPassword")
);
const Login = React.lazy(() => import("./pages/Signin/Login"));
const MailVerification = React.lazy(() =>
  import("./pages/Register/MailVerification")
);

// Appointment
const Patients = React.lazy(() => import("./pages/Patients/Patients"));
const PatientFiles = React.lazy(() => import("./pages/Patients/PatientFiles"));
const AppointmentBooked = React.lazy(() =>
  import("./pages/rdv/AppointmentBooked")
);

// Forum
const ForumHomepage = React.lazy(() => import("./pages/Forum/ForumHomepage"));
const PostComments = React.lazy(() => import("./pages/Forum/PostComments"));

const Shop = React.lazy(() => import("./pages/Shop/Shop"));
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
        path: "table",
        element: <TimeTable />,
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
      // {
      //   path: "chooseTherapist",
      //   element: <ChooseTherapist />,
      // },
      {
        path: "appointmentbooked",
        element: <AppointmentBooked />,
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
        element: <Rdv />,
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
      {
        path: "forum",
        element: <ForumHomepage />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "comments/:postId",
        element: <PostComments />,
      },
      {
        path: "espace-patient",
        element: <EspacePatient />,
        children: [
          {
            index: true,
            element: <PatientDashboard />,
          },
          {
            path: "appointments",
            element: <PatientAppointments />,
          },
          {
            path: "therapist",
            element: <PatientTherapist />,
          },
          {
            path: "settings",
            element: <PatientSettings />,
          },
        ],
      },
      {
        path: "espace-therapist",
        element: <EspaceTherapist />,
        children: [
          {
            index: true,
            element: <TherapistDashboard />,
          },
          {
            path: "calendar",
            element: <TherapistAppointments />,
          },
          {
            path: "settings",
            element: <TherapistSettings />,
          },
          {
            path: "patients",
            element: <TherapistPatients />,
          },
        ],
      },
      {
        path: "*",
        exact: true,
        element: <Navigate to="/" />,
      },
    ],
  },
]);
