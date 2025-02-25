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
import Attendences from './Components/Attendence/Attendences';
import UEmpSchedule from './Components/WorkSchedules/UEmpSchedule';
import Dashboard from './pages/Dashboard';
import ExchangeSch from './Components/WorkSchedules/ExchangeSch';
import UpdateSchedule from './Components/Updating/UpdateSchedule';
import EmpProfile from './Components/Profile/EmpProfile';
import AttendenceesOfAll from './pages/AttendenceesOfAll';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/add",
        loader: ()=>fetch('http://localhost:3001/desigDept'),
        element: <Home></Home>

      },
      {
        path:"/employee",
        loader: ()=>fetch(`http://localhost:3001/employee`),
        element: <Employees></Employees>
        // children: [
        //   {
        //     path: "employee/totalAttendence",
        //     element: <AttendenceesOfAll></AttendenceesOfAll>
        //   }
        // ]
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
        loader:()=>fetch(`http://localhost:3001/employee`)
      },
      {
        path: '/attendence',
        element: <Attendences></Attendences>,
        loader: ()=>fetch('http://localhost:3001/attendence')
      },
      {
        path:"/employeeSchedule/:id",
        element: <UEmpSchedule></UEmpSchedule>,
        loader: ()=>fetch('http://localhost:3001/employee')
      },
      {
        path: "/schedule",
        element: <Dashboard></Dashboard>,
        
      },
      {
        path: "/employeeScheduleEx/:id",
        element: <ExchangeSch></ExchangeSch>,
        loader: ()=>fetch('http://localhost:3001/employee')
      },
      {
        path: "/employeeUpdSch/:id",
        element: <UpdateSchedule></UpdateSchedule>,
        loader: ()=> fetch('http://localhost:3001/employee')
      },
      {
        path:"/employeeProfile/:id",
        element: <EmpProfile></EmpProfile>,
        loader:  ({params})=>fetch(`http://localhost:3001/employee/${params.id}`)
      },
      {
        path: "/employee/totalAttendence",
        element: <AttendenceesOfAll></AttendenceesOfAll>,
        loader: ()=>fetch("")
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
