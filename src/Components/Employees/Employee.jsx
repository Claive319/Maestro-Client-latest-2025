import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { Link, Links } from "react-router-dom";

const Employee = ({ employee, handleDeleteEmployeeBtn , index}) => {
    const { id, name, username, department, create_date, update_date, designation_id } = employee;
    const rowClass = (index + 1) % 2 === 0 
    ? "bg-[#e3edf9] rounded-[6px]" 
    : "bg-white";

    return (
        <tr className={` ${rowClass}`}>
            <td className=" px-10">{id}</td>
            <td className=" text-center">{name}</td>
            <td className=" text-center">{username}</td>
            <td className=" text-center">{department}</td>
            <td className=" text-center px-8">{create_date}</td>
            <td className=" text-center px-8">{update_date}</td>
            <td className=" text-center">{designation_id}</td>
            <td className=" text-center px-8 py-5"><Link to={`/employeeProfile/${id}`}><button className="btn btn-outline btn-success">View Profile</button></Link></td>
            <td className=" text-center px-8"><Link to={`/employee/${id}`}>
                <button className="btn btn-outline btn-success">Update</button></Link>
            </td>
            <td className=" text-center px-8"><Link to={`/employeeUpdSch/${id}`}>
                <button className="btn btn-outline btn-success">Update Schedule</button></Link>
            </td>

            <td><button className="btn btn-ghost" onClick={() => handleDeleteEmployeeBtn(id)}>
                <FaTrashCan />
            </button></td>
            <td className=" text-center px-8 py-5"><Link to={`/employeeSchedule/${id}`}><button className="btn btn-outline btn-success">Work Schedule</button></Link></td>
            <td className=" text-center px-8 py-5"><Link to={`/employeeScheduleEx/${id}`}><button className="btn btn-outline btn-success">Schedule Exchange</button></Link></td>
            <td className="  text-center px-8 py-5"><Link to={`/employee/${id}`}><button className="btn btn-outline btn-success">Attendence</button></Link></td>
        </tr>

    );
};

export default Employee;