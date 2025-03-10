import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { Home } from './Home.jsx'
import { Login } from './Login.jsx'
import { Register } from './Register.jsx'
import { CreateStore } from './CreateStore.jsx'
import { CreateProduct } from './CreateProduct.jsx'
import { GetAllStore } from './GetallStore.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/createStore",
    element: <CreateStore />,
  },
  {
    path: "/createProduct",
    element: <CreateProduct />,
  },
  {
    path: "/getAllStore",
    element: <GetAllStore />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
