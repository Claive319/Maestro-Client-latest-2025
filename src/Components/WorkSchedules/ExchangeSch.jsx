
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const ExchangeSch = () => {
    const currentScheduledEmp = useLoaderData();
    const { id } = useParams();
    const idfind = currentScheduledEmp.find(employee => String(employee.id) === String(id));
    console.log(id)

    // const deptfind = currentScheduledEmp.find(emplo=>String(emplo.department))
    const { name } = idfind;
    const { department } = idfind;

    // console.log(deptID)
    const [showthisDay, setShowThisDay] = useState([])
    const [showdaytitle, setShowDaytitle] = useState(false);
    const [emp, setEmp] = useState([])
    const [showemptitle, setShowEmpTitle] = useState(false)
    const [showemp, setShowThiseEMP] = useState([]);
    const [today, setToday] = useState('')

    useEffect(() => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = new Date().getDay();
        setToday(days[currentDay]);
    }, []);

    useState(() => {
        const addId = {
            id
        }
        fetch('http://localhost:3001/employee/exchange', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addId)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowThisDay(data)
            })
    }, [])
    useState(() => {
        const deptId = idfind.department
        const addID = {
            deptId
        }
        fetch('http://localhost:3001/employee/matchedDeptEmp', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addID)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEmp(data)
            })
    }, [])

    // useState(() => {

    //     fetch('', {

    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)

    //         })
    // }, [])

    const handleSubmitBtn = (event, id) => {
        event.preventDefault();
        console.log(idfind)
        const form = event.target;
        const idd = idfind.id;
        console.log(idd)
        const employeeSchId = form["radio-duty"].value;
        const empWith = form["radio-emp"].value;
        const exchangeDate = form.exdate.value;
        const addExchange = {
            idd, employeeSchId, empWith, exchangeDate
        }
        fetch('http://localhost:3001/employee/scheduleexchangeInsert', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addExchange)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId != 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Schedule Data Changed With That Employee Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset();
                }
            })


    }

    return (
        <div>
            <form onSubmit={handleSubmitBtn} className="card-body">
                <h1 className="font-semibold text-xl text-center">{name}</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Employee ID</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        name="emp-id"

                        defaultValue={idfind?.id}
                        placeholder="Please enter your employee ID"
                        id=""
                    />
                    <input
                        type="number"
                        className="input input-bordered"
                        name="dept-id"
                        defaultValue={idfind?.department}
                        placeholder="Please enter your employee ID"
                        id=""
                    />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Employee Department</span>
                        </label>

                    </div>
                </div>
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 font-extrabold text-xl h-[90px]"
                    >
                        {showdaytitle && showthisDay.length > 0
                            ? `${showthisDay[0].name} (${showthisDay[0].From_t} - ${showthisDay[0].To_t})`
                            : "Select Day"
                        }
                    </div>

                    <ul>
                        {Array.isArray(showthisDay) && showthisDay.length > 0 ? (
                            showthisDay.map((item, index) => (
                                <li key={index}>
                                    <a className="flex gap-9">
                                        <input
                                            type="radio"
                                            value={item.id}
                                            onClick={() => {
                                                setShowThisDay([item]);
                                                setShowDaytitle(true);

                                            }}
                                            name="radio-duty"
                                            className="checkbox"
                                            checked={showthisDay[0]?.id === item.id} // ✅ Fix checked condition
                                        />
                                        <span className="label-text">{item.name}</span>
                                        <span className="label-text">{item.From_t} - {item.To_t}</span>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 text-center">No data available</li>
                        )}
                    </ul>
                </div>
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 font-extrabold text-xl h-[90px]"
                    >
                        {showemptitle && showemp.length > 0
                            ? `${showemp[0].name} `
                            : "Select Which Employee Is Going to Switch With"
                        }
                    </div>

                    <ul>
                        {Array.isArray(emp) && emp.length > 0 ? (
                            emp.map((item, index) => (
                                <li key={index}>
                                    <a className="flex gap-9">
                                        <input
                                            type="radio"
                                            value={item.id}
                                            onClick={() => {
                                                setShowThiseEMP([item]);
                                                setShowEmpTitle(true);
                                            }}
                                            name="radio-emp"
                                            className="checkbox"
                                            checked={showemp[0]?.id === item.id}
                                        />
                                        <span className="label-text">{item.name}</span>

                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 text-center">No employees available</li>
                        )}
                    </ul>
                </div>
                <div>
                    <h1 className="font-extrabold text-xl text-left">Created Date : <span className="text-red-700">{today}</span> </h1>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-left text-lg">On Which Day you want to exchange With </h1>
                    <div className="">
                        <input type="date" className="input input-bordered" name="exdate" id="" />

                    </div>

                </div>



                <input type="submit" className="btn hover:btn-secondary mx-auto w-[300px] mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px] border-purple-200 bg-white hover:text-white" value="Submit" />
            </form>


        </div>
    );
};

export default ExchangeSch;