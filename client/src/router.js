import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Signin/Login';
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
      
        ]
    }
]);