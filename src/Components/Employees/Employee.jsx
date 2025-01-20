import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { Link, Links } from "react-router-dom";

const Employee = ({ employee, handleDeleteEmployeeBtn }) => {
    const { id, name, username, department, create_date, update_date, designation_id } = employee;

    return (
        <tr className="border-2">
            <td className="border-2 px-10">{id}</td>
            <td className="border-2 text-center">{name}</td>
            <td className="border-2 text-center">{username}</td>
            <td className="border-2 text-center">{department}</td>
            <td className="border-2 text-center px-8">{create_date}</td>
            <td className="border-2 text-center px-8">{update_date}</td>
            <td className="border-2 text-center">{designation_id}</td>
            <td className="border-2 text-center px-8"><Link to={`/employee/${id}`}>
                <button className="btn btn-ghost">Update</button></Link></td>

            <td><button className="btn btn-ghost" onClick={() => handleDeleteEmployeeBtn(id)}>
                <FaTrashCan />
            </button></td>
            <td className="border-2 text-center px-8"><Link to={`/employee/${id}`}><button className="btn btn-ghost">Attendence</button></Link></td>
        </tr>



        // <div className="card card-compact bg-white/30  backdrop-blur-sm w-96 shadow-xl transition duration-7000 hover:scale-110 hover:shadow-2xl">
        //     <div className="card-body">
        //         <h1 className="text-center font-bold text-lg">
        //             Department ID : {id}
        //         </h1>
        //         <h1 className="text-center font-black  text-[rgb(19,19,19)] text-2xl">
        //             Employee Name : {name}
        //         </h1>
        //         <h1 className="text-center font-black  text-[rgb(19,19,19)] text-2xl">
        //             Username : {username}
        //         </h1>
        //         <h1 className="text-center font-black   text-[rgb(19,19,19)] text-2xl">
        //             Department ID :  <span className="font-semibold text-green-500">{department}</span>
        //         </h1>
        //         <h1 className="text-center font-black  text-[rgb(19,19,19)] text-2xl">
        //             Create Date : <span className="text-red-700">{create_date}</span>
        //         </h1>
        //         <h1 className="text-center font-black  text-[rgb(19,19,19)] text-2xl">
        //             Last Update Date : {update_date}
        //         </h1>
        //         <h1 className="text-center font-black  text-[rgb(19,19,19)] text-2xl">
        //             Designation ID : {designation_id}
        //         </h1>
        //         <div className="flex container gap-8 justify-center">

        //             <Link to={`/employee/${id}`}><button className="btn btn-ghost">Update</button></Link>
        //             <button className="btn btn-ghost" onClick={() => handleDeleteEmployeeBtn(id)}>

        //                 <FaTrashCan />
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Employee;