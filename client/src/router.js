import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile2 from './pages/Profile/Profile2';

const Profile = React.lazy(()=>import('./pages/Profile/Profile'));
const Register = React.lazy(()=>import( './pages/Register/Register'));
const Forgotpassword = React.lazy(()=>import( './pages/forgotPassword/forgotPassword'));
const Resetpassword = React.lazy(()=>import( './pages/ResetPassword/resetPassword'));
const Homepage = React.lazy(()=>import("./pages/Homepage/Homepage"));
const Login = React.lazy(()=>import( './pages/Signin/Login'));


export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element: <Homepage />
            },
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <Register />,
            },
            {
              path: 'profile',
              element: (
                  <Profile />
              ),
            },
            {
              path: 'forgetpassword',
              element: (
                      <Forgotpassword />
                ),
            },
            {
              path: 'resetpassword',
              element: (
                      <Resetpassword/>
                ),
            },
           
            {path: 'profile2',
          element:(

            <Profile2/>
          )}
        ]
    }
]);