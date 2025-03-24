import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css"; // Corrected CSS import
import "datatables.net";
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";




import Echandedempdatashow from './Echandedempdatashow';
import DeptBasedEmps from '../Components/Department Based/DeptBasedEmps';


const Dashboard = () => {

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [currentsch, setCurrentSch] = useState([]);
    const [emp, setEmp] = useState([]);
    const [today, setToday] = useState('');
    const [abslist, setAbsList] = useState([]);
    const [curremp, setCurrEmp] = useState([]);
    const [sthData, setSthData] = useState([]);
    const [deptbased, setDeptBased] = useState([]);
    const [getallemplist, setGetAllEmpList] = useState([]);
    const [exchangedempdata, setEchangedEmpData] = useState([]);
    const [getattenlist, setGetAttenList] = useState([]);
    const [clickBtn, setClickBtn] = useState(false);

    const navigate = useNavigate();

    const searSubmitBtn = async (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form["searchId"].value.trim();

        // Check if search input contains only letters and spaces (basic validation for names)
        if (!/^[a-zA-Z\s]+$/.test(search)) {
            Swal.fire({
                title: "Invalid Input!",
                text: "Please enter a valid name.",
                icon: "warning",
                confirmButtonText: "Ok",
            });
            return;
        }

        const addSearchByID = { search };

        try {
            const response = await fetch("http://localhost:3001/employeeIdSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addSearchByID)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error occurred");
            }

            const data = await response.json();

            if (data && data.id) {
                console.log(data.id);
                navigate(`/employeeProfile/${data.id}`);
            } else {
                Swal.fire({
                    title: "No Such Name Exists!",
                    text: "Please enter a correct employee name.",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Something went wrong.",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };
    const handleGetReqBtn = async () => {
        try {
            const response = await fetch("https://pkbox.bil.pe/api/v1/user/getUserInformation", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer eyJ0eXBlIjoiand0IiwiZGV2aWNlIjoiVlRGRmRWbFVTWGRTTWxwVFpVVkdhZz09IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyIjoiV1ZkWmVVNVhSbXBhUkZWMFdYcGpNazFwTURCTlJFcHRURmRLYVUxRVZYUlplbFY1VFVkRk5GbFVaek5OZWtsNSIsInN1YiI6IlNoYXdhbiBSb3kiLCJpYXQiOjE3NDA1NTIyMDAsImV4cCI6MTc0MTIwMDIwMH0.3Hx2fJjmV1SSuD9jagnLsADiQibL1Ero20t7u2BJu00`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("User Information:", data);
        } catch (error) {
            console.error("Error fetching user information:", error.message);
        }
    };


    const handleAbsentbtn = () => {
        const currentdaay = today;
        console.log(currentdaay);
        const addDau = { currentdaay };

        fetch('http://localhost:3001/addSchedule/countabs', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addDau)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAbsList(data);
            });
    };

    useEffect(() => {
        fetch('http://localhost:3001/employee/depatmentBased', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDeptBased(data);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/attendence/totalpresent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data); // Check the response format
                if (data.length > 0) {  // Ensure there's data before accessing it
                    setGetAttenList(data[0]); // Set the first object from the array
                }
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/attendence/totalemployees', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.length > 0) {
                    setGetAllEmpList(data[0]);
                }
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/employee/sthData')
            .then(res => res.json())
            .then(data => {
                console.log("STH Data:", data);
                setSthData(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/employee/checkIFtodayisTheDay', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEchangedEmpData(data);
            });
    }, []);

    useEffect(() => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = new Date().getDay();
        setToday(days[currentDay]);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/employee/workthatday', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCurrEmp(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/employee/emptoday', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.length > 0) {
                    setCurrentSch(data);
                }
            });
    }, []);
    //  useEffect(() => {
    //     fetch('http://localhost:3001/employee/emp', {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.length > 0) {
    //                 setEmp(data)
    //             }
    //         })
    // }, [])
    // useEffect(()=>{
    //     fetch("http://localhost:3001/employee/emp",{
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //         setEmp(data)
    //     })
    // },[])

    // Initialize DataTables for the table with id "example"
    useEffect(() => {
        fetch('http://localhost:3001/employee/emp', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                setEmp(data);
                if ($("#example").length) {
                    $("#example").DataTable({
                        data: data,
                        columns: [
                            {
                                title: "Name",
                                data: "name",
                            },
                        ],
                    });
                }
            });
    }, []);


    return (
        <div className='w-[1720px] ml-[373px] mb-10 bg-gray-200 rounded-[25px]'>
            <form onSubmit={searSubmitBtn} className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" name="searchId" placeholder="Search by name view profile" />
                    </div>
                </div>
                <input className='indicator btn join-item' type="submit" value="Search" />
            </form>
            <div className='h-[380px] text-left bg-[#FAFAF9] rounded-[15px] m-4'>
                <div className='flex text-start justify-around'>
                    <p className='text-2xl text-center font-bold mb-6'>
                        Today is: <strong>{today}</strong>
                    </p>
                    <div>
                        <button
                            onClick={() => {
                                handleAbsentbtn();
                                setClickBtn(!clickBtn);
                            }}
                            className='btn btn-success'
                        >
                            Check Todays Absent Employees
                        </button>
                    </div>
                </div>
                <div className='flex gap-7 justify-around'>
                    <div className='border-2 p-7 rounded-[20px]'>
                        <h1 className='text-2xl text-center font-bold mb-6 underline'>Employee by department</h1>
                        <div className='text-base'>
                            {deptbased.map((base) => (
                                <div key={base.id} className="flex">
                                    <DeptBasedEmps base={base} />
                                    <span className="mx-1"></span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='border-2 rounded-2xl'>
                        <h1 className='text-2xl text-center font-bold mb-6 p-2 underline'>Employee Status</h1>
                        <h1 className="text-base p-2">
                            Total: <span className="text-red-600">{getallemplist.count || 0}</span> employees
                        </h1>
                        <h1 className="text-base p-2">
                            Present: <span>{getattenlist.count || 0}</span> employees
                        </h1>
                        {clickBtn ? (
                            abslist.map(abs => (
                                <h1 key={abs.id} className="text-base  p-2">
                                    Absent: <span className="text-red-700">{abs.count}</span> employees
                                </h1>
                            ))
                        ) : (
                            <p className="text-base p-2">hidden</p>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handleGetReqBtn} className='btn btn-success'>Get Request</button>
            </div>

            <h1 className='text-2xl text-center font-extrabold mb-6 p-2'>
                Duty Schedule of <strong>{today}</strong>
            </h1>

            <div className='p-2' id="nice">
                {exchangedempdata.filter(exch => {
                    // Convert date while preserving local timezone
                    const formattedDate = new Date(exch.Exchange_date);
                    formattedDate.setMinutes(formattedDate.getMinutes() - formattedDate.getTimezoneOffset());
                    const correctedDate = formattedDate.toISOString().split("T")[0];

                    return correctedDate === "2025-02-09";
                }).length > 0 ? (
                    exchangedempdata
                        .filter(exch => {
                            const formattedDate = new Date(exch.Exchange_date);
                            formattedDate.setMinutes(formattedDate.getMinutes() - formattedDate.getTimezoneOffset());
                            const correctedDate = formattedDate.toISOString().split("T")[0];

                            return correctedDate === "2025-02-09";
                        })
                        .map(exch => <Echandedempdatashow key={exch.id} exch={exch} />)
                ) : (
                    <p className="text-2xl text-center font-bold mb-6">
                        No Employees Changed shift with other Employees today
                    </p>
                )}
            </div>

            <div className="flex p-10 space-x-6 rounded-2xl">
                <ul className="flex flex-col bg-[#FAFAF9] rounded-[18px]">
                    <h1 className="text-xl font-bold border-2 text-center p-2 text-red-800">
                        Support Employees
                    </h1>
                    <h1 className="text-lg font-bold border-2 text-center p-2">
                        Log Support
                    </h1>
                    {curremp
                        .filter(emp => emp.department === 15)
                        .map(ajkeremp => (
                            <li key={ajkeremp.id} className="border-2 px-10 py-3">
                                {ajkeremp.name}
                            </li>
                        ))}
                    <h1 className="text-lg font-bold border-2 text-center px-10">
                        Billing Support
                    </h1>
                    {curremp
                        .filter(emp => emp.department !== 15)
                        .map(ajkeremp => (
                            <li key={ajkeremp.id} className="border-2 p-2">
                                {ajkeremp.name}
                            </li>
                        ))}
                </ul>

                <div className="  rounded-[15px] ">
                    <table className='bg-[#FAFAF9] rounded-[18px] '>
                        <thead>
                            <tr className="border-2 ">
                                {currentsch.map(shg => {
                                    // Ensure From_t and To_t are strings in HH:mm format
                                    const [inHours, inMinutes] = shg.From_t.split(':').map(Number);
                                    const [outHours, outMinutes] = shg.To_t.split(':').map(Number);

                                    // Create date objects for proper formatting
                                    const formattedInTime = new Date(1970, 0, 1, inHours, inMinutes).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    });

                                    const formattedOutTime = new Date(1970, 0, 1, outHours, outMinutes).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    });

                                    return (
                                        <th className="border-2 text-center p-2" key={shg.id}>
                                            {formattedInTime} - {formattedOutTime}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {emp.map(sch => (
                                <tr key={sch.id} className="border-2 text-center">
                                    {currentsch.map(shg => (
                                        <td key={`${shg.id}-${sch.id}`} className="border-2 p-2">
                                            {shg.duty_hour_id === sch.duty_hour_id ? sch.name : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    );
};

export default Dashboard;
