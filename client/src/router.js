import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { rootLoader } from './loaders/rootLoader';
const Homepage = React.lazy(()=>import("./pages/Homepage/Homepage"));
const Signup = React.lazy(()=>import("./pages/Signup/Signup"));
const Signin = React.lazy(()=>import("./pages/Signin/Signin"));
const Profile = React.lazy(()=>import("./pages/Profile/Profile"));

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        loader: rootLoader,
        children:[
            {
                index:true,
                element: <Homepage />
            }
      
        ]
    }
]);