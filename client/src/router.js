import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from './App';
<<<<<<< Updated upstream
=======
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Signin/Login';
import Forgotpassword from './pages/forgotPassword/forgotPassword';
import Resetpassword from './pages/ResetPassword/resetPassword';
>>>>>>> Stashed changes
const Homepage = React.lazy(()=>import("./pages/Homepage/Homepage"));
// const Signup = React.lazy(()=>import("./pages/Signup/Signup"));
export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        // loader: rootLoader,
        children:[
            {
                index:true,
                element: <Homepage />
<<<<<<< Updated upstream
            }
=======
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
      
>>>>>>> Stashed changes
      
        ]
    }
]);