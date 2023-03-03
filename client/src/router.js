import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from './App';
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
            }
      
        ]
    }
]);