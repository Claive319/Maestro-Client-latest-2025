import React from 'react';
import { useEffect, useState } from 'react';
import Echandedempdatashow from './Echandedempdatashow';
import DeptBasedEmps from '../Components/Department Based/DeptBasedEmps';

const Dashboard = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[new Date().getDay()];
    const todaynew = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD

    // const showSchedule = useLoaderData();
    // console.log(showSchedule)
    const [currentsch, setCurrentSch] = useState([]);
    const [emp, setEmp] = useState([]);
    const [today, setToday] = useState('');
    const [abslist, setAbsList] = useState([]);
    const [curremp, setCurrEmp] = useState([]);
    const [sthData, setSthData] = useState([]);
    const [deptbased, setDeptBased] = useState([]);
    const [getallemplist, setGetAllEmpList] = useState([]);
    const [exchangedempdata, setEchangedEmpData] = useState([])
    const [getattenlist, setGetAttenList] = useState([]);
    console.log(getattenlist.count)
    console.log(abslist)
    console.log(document.getElementById('nice'));
    const [clickBtn, setClickBtn] = useState(false);
    const handleAbsentbtn = () => {


        const currentdaay = today;
        console.log(currentdaay)
        const addDau = {
            currentdaay
        }
        fetch('http://localhost:3001/addSchedule/countabs', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addDau)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAbsList(data)

            })
    }
    useEffect(() => {
        fetch('http://localhost:3001/employee/depatmentBased', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDeptBased(data)
            })
    }, [])

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
                console.log(data)
                if (data.length > 0) {
                    setGetAllEmpList(data[0])
                }
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/employee/sthData') // Update the API URL accordingly
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
                console.log(data)
                setEchangedEmpData(data)

            })
    }, [])
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
                console.log(data)
                setCurrEmp(data)

            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/employee/emptoday', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.length > 0) {
                    setCurrentSch(data)
                }

            })

    }, [])
    useEffect(() => {
        fetch('http://localhost:3001/employee/emp', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.length > 0) {
                    setEmp(data)
                }
            })
    }, [])

    return (
        <div className=''>
            <div className='flex justify-between'>
                <h1>Welcome!</h1>
                <p className='text-4xl font-extrabold text-center p-10'>Today is: <strong>{today}</strong></p>


                {/* <label htmlFor="daySelect">Choose a day: </label>
                <select id="daySelect" defaultValue={today}>
                    <option name='sun' value="Sunday">Sunday</option>
                    <option name='mon' value="Monday">Monday</option>
                    <option name='tue' value="Tuesday">Tuesday</option>
                    <option name='wed' value="Wednesday">Wednesday</option>
                    <option name='thu' value="Thursday">Thursday</option>
                    <option name='fri' value="Friday">Friday</option>
                    <option name='sat' value="Saturday">Saturday</option>
                </select> */}

                <div >
                    <button onClick={() => { handleAbsentbtn(); setClickBtn(!clickBtn); }} className='btn btn-success'>Check Todays Absent Employees</button>
                </div>



            </div>
            <div>
                <h1 className='text-center font-extrabold text-4xl'>Total:  <span className='text-red-600'>{getallemplist.count || 0}</span>  employees <span> , Present : {getattenlist.count || 0} employees</span></h1>
            </div>
            <div>
                <h1 className='text-center font-extrabold text-4xl'>

                </h1>
            </div>
            {
                clickBtn ? (
                    abslist.map(abs => <h1 className='text-4xl text-center font-extrabold' key={abs.id}>Absent <span className='text-red-700'>{abs.count}</span>  employees </h1>)
                ) : (
                    'hidden'
                )
            }
            <div className='text-center font-extrabold text-4xl'>
                {deptbased.map((base, index) => (
                    <span key={base.id} className="inline-flex">
                        <DeptBasedEmps base={base} />
                        {index < deptbased.length - 1 && ', '}
                    </span>
                ))}
            </div>





            <h1 className='text-center font-extrabold text-5xl p-20'>Only Todays Duty Hour</h1>

            <div className='py-7' id="nice">
                {exchangedempdata.filter(exch => {
                    // Convert date while preserving local timezone
                    const formattedDate = new Date(exch.Exchange_date);
                    formattedDate.setMinutes(formattedDate.getMinutes() - formattedDate.getTimezoneOffset());
                    const correctedDate = formattedDate.toISOString().split("T")[0];

                    console.log(exch);
                    console.log(correctedDate);

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
                    <p className="font-extrabold text-3xl text-center">
                        No Employees Changed shift with other Employees today
                    </p>
                )}
            </div>


            <div className='flex'>
                <ul>
                    <h1 className='text-xl font-bold border-2 text-center px-10 text-red-800'>Todays shift of the Employees</h1>
                    {/* Employees of Billing */}
                    <h1 className="text-lg font-bold border-2 text-center px-10">Employees of Log Support</h1>
                    {curremp
                        .filter(emp => emp.department === 15)
                        .map(ajkeremp => (
                            <li key={ajkeremp.id} className='border-2 px-10 py-3'>{ajkeremp.name}</li>
                        ))}

                    {/* Employees of Log Support */}
                    <h1 className="text-lg font-bold border-2 text-center px-10">Employees of Billing Support</h1>
                    {curremp
                        .filter(emp => emp.department !== 15)
                        .map(ajkeremp => (
                            <li key={ajkeremp.id} className='border-2 px-10 py-3'>{ajkeremp.name}</li>
                        ))}
                </ul>
                <table>
                    <thead>
                        <tr className="border-2">
                            {
                                currentsch.map(shg => {
                                    // Extract AM/PM from the time
                                    const formattedInTime = new Date(`1970-01-01T${shg.From_t}`).toLocaleString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    });

                                    const formattedOutTime = new Date(`1970-01-01T${shg.To_t}`).toLocaleString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    });

                                    return (
                                        <th className='border-2 text-center px-10' key={shg.id}>
                                            {formattedInTime} - {formattedOutTime}
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>

                    <tbody>

                        {emp.map(sch => (
                            <tr key={sch.id} className='border-2 text-center'>
                                {currentsch.map(shg => (

                                    <td key={`${shg.id}-${sch.id}`} className="border-2 px-10">
                                        {shg.duty_hour_id === sch.duty_hour_id ? sch.name : ""}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>



            </div>



        </div>
    );
};

export default Dashboard;