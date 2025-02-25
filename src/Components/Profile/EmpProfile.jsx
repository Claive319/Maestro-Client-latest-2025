import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import EmployeesOwnSchedules from './EmployeesOwnSchedules';
import AttendenceofThatEmp from './AttendenceofThatEmp';
import ExchangedScheduleProfile from './ExchangedScheduleProfile';
import TotalEmployeeHour from './TotalEmployeeHour';

const EmpProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [schedule, setSchedule] = useState([]);
    const [exchangedsch, setExchangedSch] = useState([]);
    const [onlyattendence, setOnlyAttendence] = useState([]);
    const navigate = useNavigate();

    const [totalhour, setTotalHour] = useState([])
    const handleSubmitBtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const month = form.month.value;
        const monthNumber = parseInt(month.split("-")[1]); // Convert "01" to 1

        // Array of month names (January is index 0)
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        console.log(monthNames[monthNumber - 1]);
        const addAtten = {
            id: id, // Make sure 'id' is defined
            month: monthNames[monthNumber - 1] // Assigning month with key "month"
        };
        fetch('http://localhost:3001/employee/totalWorkHour', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addAtten),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTotalHour(data)
            })
    }
    const handleAttendenceSubmitBtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const att = form.amonth.value;
        const monthNumber = parseInt(att.split("-")[1]);

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const addThisMonthAtten = {
            id,
            month: monthNames[monthNumber - 1]
        };

        fetch('http://localhost:3001/employee/allAttendence', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addThisMonthAtten),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOnlyAttendence(data);
            })
            .catch(error => console.error("Error fetching attendance:", error));
    };
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
        fetch('http://localhost:3001/employee/allscheduleExch', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setExchangedSch(data)
            })
    }, [])
    useEffect(() => {
        const currentMonth = new Date().getMonth();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        fetch('http://localhost:3001/employee/allAttendence', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, month: monthNames[currentMonth] }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOnlyAttendence(data);
            })
            .catch(error => console.error("Error fetching attendance:", error));
    }, [id]);
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

    const handleGoBack = () => {
        navigate(-1);
    }

    // const idFind = emList.find(newemp => newemp.id === id)
    const {
        employee_name,
        username,
        department_title,
        designation_title,
    } = profile;

    return (
        <div className='ml-[373px] flex mb-9'>
            <div className='flex-none '>
                <div className='flex w-1/3'>
                    <div className='bg-white min-h-[50px]  mb-6 border border-[#f2f4f9] rounded-[10px] shadow-md'>

                        {/* Employee Information */}
                        <div className='card w-full bg-base-100 text-center flex shadow-2xl p-20 flex-wrap justify-center'>
                            <h1 className='text-4xl font-bold'>{employee_name}</h1>
                            <p className=' font-extrabold text-4xl'>
                                <small> User Name : <span className='text-red-700'>{username}</span></small>
                            </p>
                            <p>Department: {department_title}</p>
                            <p>Designation: {designation_title}</p>
                        </div>
                        {/* Attendance Information */}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-12">
                        <form onSubmit={handleSubmitBtn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-2xl text-center font-bold">Check Total duty hour Of this Employee by month</span>
                                </label>
                                <input type="month" name="month" id="" />
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className='btn btn-primary' value="Sumbit" />
                            </div>
                        </form>
                        <div className='justify-start'>
                            {
                                totalhour.map(total => <TotalEmployeeHour key={total.id} total={total}></TotalEmployeeHour>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* hello */}
            <div className='flex space-x-7'>
                <div className='flex flex-col mx-auto space-y-5'>
                    <div className="card bg-base-100 w-[600px]   shadow-2xl">
                        <form onSubmit={handleAttendenceSubmitBtn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-2xl font-extrabold text-center">Load Attendence Monthi-wise</span>
                                </label>
                                <input type="month" name="amonth" id="" />
                            </div>

                            <input className='btn btn-primary' type="submit" value="Submit" />
                        </form>
                        <div className='flex flex-col gap-7 px-10 mx-auto py-20'>
                            <h1 className='text-center font-extrabold text-5xl'>Attendance</h1>
                            <div className='overflow-x-auto'>
                                <table className='table'>
                                    <thead>
                                        <tr className='bg-[#e3edf9] rounded-[6px]'>
                                            <th className='border-2 text-center px-10'>In Time</th>
                                            <th className='border-2 text-center px-10'>Out Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {onlyattendence.map((attendances, index) => (
                                            <AttendenceofThatEmp key={attendances.id} attendances={attendances} index={index} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto p-9 '>
                        <button className='btn  py-12 font-extrabold text-3xl' onClick={handleGoBack}>Go Back</button>
                    </div>
                </div>
                <div className=' w-[820px]  left-[836px] top-[256px] rounded-[15px] bg-[#e3edf9]'>
                    <div className="flex flex-col gap-7 ">
                        <h1 className="text-5xl font-bold text-center mx-auto">Duty Schedules</h1>
                        <table className=''>
                            <thead>
                                <tr className='border-2 text-center px-10'>
                                    <th className='border-2 text-center px-10'>Duty Day</th>
                                    <th className='border-2 text-center px-10'>From Time</th>
                                    <th className='border-2 text-center px-10'>To Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <EmployeesOwnSchedules sch={schedule}></EmployeesOwnSchedules>

                            </tbody>
                        </table>
                    </div>
                    <div className='px-4 justify-between align-middle'>
                        <h1 className='font-extrabold text-3xl text-center p-10'>Exchange Schedule</h1>
                        <table>
                            <thead>
                                <tr className='border-2 text-center px-10'>
                                    <th className='border-2 text-center px-10' >Date</th>
                                    <th className='border-2 text-center px-10'>Employee who changed Shift</th>
                                    <th className='border-2 text-center px-10'>Whom with duty exchanged</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    exchangedsch.map(exch => <ExchangedScheduleProfile key={exch.id} exch={exch}></ExchangedScheduleProfile>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EmpProfile;