import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Signup from './assets/component/SIGNUP/signup.jsx'
import Search from './assets/page/search.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "signup",
    element: <Signup></Signup>,
  },
  {
    path: "search",
    element: <Search></Search>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
