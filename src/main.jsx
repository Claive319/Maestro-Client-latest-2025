import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from './pages/Mainlayout';
import Home from './pages/Home';
import Employees from './Components/Employees/Employees';
import Designations from './Components/Designations/Designations';
import Departments from './Components/Departments/Departments';
import UpdateDesignations from './Components/Designations/UpdateDesignations';
import UpdateDepts from './Components/Departments/UpdateDepts';
import UpdateEmployee from './Components/Employees/UpdateEmployee';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        loader: ()=>fetch('http://localhost:3001/desigDept'),
        element: <Home></Home>,
      },
      {
        path:"/employee",
        loader: ()=>fetch(`http://localhost:3001/employee`),
        element: <Employees></Employees>
      },
      {
        path:"/designations",
        loader: ()=>fetch('http://localhost:3001/designations'),
        element: <Designations></Designations>
      },
      {
        path: "/dept",
        loader: ()=>fetch('http://localhost:3001/dept'),
        element: <Departments></Departments>
      },
      {
        path: '/designations/:id',
        element: <UpdateDesignations></UpdateDesignations>,
        loader: ({params}) => fetch(`http://localhost:3001/designations/${params.id}`)
      },
      {
        path:'/dept/:id',
        element:<UpdateDepts></UpdateDepts>,
        loader: ({params})=>fetch(`http://localhost:3001/dept/${params.id}`)
      },
      {
        path:"/employee/:id",
        element:<UpdateEmployee></UpdateEmployee>,
        loader:({params})=>fetch(`http://localhost:3001/employee/${params.id}`)
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
