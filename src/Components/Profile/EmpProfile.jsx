import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import EmployeesOwnSchedules from './EmployeesOwnSchedules';
import AttendenceofThatEmp from './AttendenceofThatEmp';

const EmpProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [schedule, setSchedule] = useState([]);
    const [onlyattendence, setOnlyAttendence] = useState([]);
    console.log(id)
    useEffect(() => {
        if (!id) return;

        fetch("http://localhost:3001/employee/allinfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    console.log("Fetched Data:", data[0]); // Only log the first object
                    setProfile(data[0]); // Set only the first object
                } else {
                    console.log("No data found or data is not an array");
                    setProfile(null); // Handle empty data properly
                }
                setLoading(false); // Data loaded
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });


    }, [id]);
    useEffect(() => {
        fetch('http://localhost:3001/employee/allAttendence', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOnlyAttendence(data)
            })
    }, [id])
    useEffect(() => {
        if (!id) return;

        fetch("http://localhost:3001/employee/allscheduleofEmp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    console.log("Fetched Schedule Data:", data);
                    setSchedule(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setSchedule([]); // Ensure schedule remains an array
                }
            })
            .catch(error => {
                console.error("Error fetching schedule:", error);
                setSchedule([]);
            });
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg font-bold">Loading...</p>;
    }

    if (!profile) {
        return <p className="text-center text-lg font-bold text-red-500">No employee data found.</p>;
    }

    // const idFind = emList.find(newemp => newemp.id === id)
    const {
        employee_name,
        username,
        department_title,
        designation_title,

        date_of_attendendence,
        in_Time,
        out_Time
    } = profile;

    return (
        <>
            <div className='card-body bg-base-100 w-full max-w-sm shrink-0 items-center text-center'>
                {/* Employee Information */}
                <div className='text-center '>
                    <h1 className='text-4xl font-bold'>{employee_name}</h1>
                    <p className='text-orange-800 font-extrabold text-4xl'>
                        <small> User Name : {username}</small>
                    </p>
                    <p>Department: {department_title}</p>
                    <p>Designation: {designation_title}</p>
                </div>

                {/* Attendance Information */}

                <div className='flex'>
                    <table>
                        <thead>
                            <tr className='border-2 text-center px-10'>
                                <th className='border-2 text-center px-10'>Attendance Day</th>
                                <th className='border-2 text-center px-10'>In Time</th>
                                <th className='border-2 text-center px-10'>Out Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AttendenceofThatEmp attendances={onlyattendence} />
                        </tbody>
                    </table>

                    <div className='flex flex-col items-start ml-6 justify-center mt-6'>
                        <h2 className="text-xl font-bold text-center">Duty Schedules</h2>
                        <div className='grid grid-cols-3'>
                            {schedule.length > 0 ? (
                                schedule.map(sch => (
                                    <EmployeesOwnSchedules key={sch.id} sch={sch} />
                                ))
                            ) : (
                                <p className="text-red-500">No schedule available</p>
                            )}

                        </div>

                    </div>
                </div>

            </div>




        </>
    );
};

export default EmpProfile;