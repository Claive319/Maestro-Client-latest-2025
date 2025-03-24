import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import EachAttendence from './EachAttendence';


const AttendenceesOfAll = () => {
    // const showAllAttendences = useLoaderData() || []; // Ensure it's an array
    const [attendence, setAttendence] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/employee/totalAttendence', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAttendence(data)
            })
    }, [])

    return (
        <div className='flex flex-col mx-auto p-2 '>
            <h1 className="text-center font-bold text-2xl">All Attendance</h1>
            <div className=' rounded-[18px]'>
                <table className=''>
                    <thead className="bg-[#e3edf9] rounded-[6px]">
                        <tr className="text-center px-10">
                            <th className="text-center px-10">Name</th>
                            <th className="text-center px-10">In Time</th>
                            <th className="text-center px-10">Out Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* Pass the whole attendance array to EachAttendence */}
                        <EachAttendence employee={attendence} />
                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default AttendenceesOfAll;