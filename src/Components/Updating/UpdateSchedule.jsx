import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const UpdateSchedule = () => {
    const currentScheduledEmp = useLoaderData();
    const [showday, setShowDay] = useState([]);
    const [showthisDay, setShowThisDay] = useState([]);
    const [showdaytitle, setShowDaysTitle] = useState(false);
    const [showfromtime, setShowFromTime] = useState([]);
    const [maindays, setMainDays] = useState([]);
    // const [swappedDay, setSwappedDay] = useState(""); // Holds swapped value
    const [onlyemp, setOnlyEmp] = useState([])
    const [showmaindays, setShowMainDays] = useState([])
    const [showmainddaytitle, setShowMainDayTitle] = useState(false)
    const [showtimes, setShowTimes] = useState([]);
    const [showfromtimetitle, setShowFromTimeTitle] = useState(false);
    const { id } = useParams();
    const idfind = onlyemp.find(employee => String(employee.id) === String(id)) || {};
    const { name } = idfind;


    useEffect(() => {
        fetch('http://localhost:3001/employee')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOnlyEmp(data)
            })
    }, [])
    useEffect(() => {
        fetch('http://localhost:3001/days')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMainDays(data)
            })
    }, [])
    useEffect(() => {
        fetch('http://localhost:3001/days')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowDay(data)
            })
    }, [])
    const handleOnclickbtn = (event) => {
        event.preventDefault();
        // const form = event.target;
        const daySelected = event.target.value;
        const addDay = {
            daySelected
        };
        fetch('http://localhost:3001/employee/filterHour', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addDay)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowTimes(data)

            })
    }
    const handleFormSubmitBTN = (event) => {
        event.preventDefault();
        const form = event.target;

        // Swap values
        const dayToBeChangedInto = form["radio-duty"].value
        const daySelected = form["radio-change"].value
        console.log(daySelected) // Taking value from radio-change
        // const daySelected = form["radio-change"].value; 
        // form[""].value = daySelected; // Assigning it to radio-duty
        console.log(form["radio-change"].value)

        const id = form["emp-id"].value;
        // const time = form["radio-hour"].value;
        console.log(daySelected)

        const addSchedule = {
            dayToBeChangedInto,
            daySelected,
            id,
            
        };

        console.log(addSchedule);

        fetch('http://localhost:3001/employeeUpdSch/update', {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addSchedule)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId != 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Work Schedule Exchanged Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset();
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: data.message,
                        icon: "error",
                        confirmButtonText: "Try Again",
                    });
                }
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleFormSubmitBTN} className="card-body">
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

                </div>
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 font-extrabold text-xl h-[90px] text-left"
                    >
                        {showmainddaytitle ? showmaindays?.name : "Which Day You Want to Exchange Schedule"}
                    </div>

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        {maindays.map((item, index) => (
                            <li key={index}>
                                <a className="flex gap-9">
                                    <input
                                        type="radio"
                                        value={item.id}
                                        onChange={(event) => {
                                            setShowMainDays(item); // Update selected day for radio-duty
                                            setShowMainDayTitle(true); // Update title visibility
                                            handleOnclickbtn(event); // Fetch related data
                                        }}
                                        name="radio-change"
                                        id="radio-change"
                                        className="checkbox"
                                        checked={showmaindays?.id === item.id}
                                    />
                                    <span className="label-text">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Day Selection Dropdown */}
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 font-extrabold text-xl h-[90px]"
                    >
                        {showdaytitle ? showthisDay?.name : "Select Day"}
                    </div>

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        {showday.map((item, index) => (
                            <li key={index}>
                                <a className="flex gap-9">
                                    <input
                                        type="radio"
                                        value={item.id}
                                        onChange={(event) => {
                                            setShowThisDay(item); // Update selected day
                                            setShowDaysTitle(true); // Update title visibility
                                            handleOnclickbtn(event); // Fetch related data
                                        }}
                                        name="radio-duty"
                                        id="radio-duty"
                                        className="checkbox"
                                        checked={showthisDay?.id === item.id}
                                    />
                                    <span className="label-text">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Time Selection Dropdown */}
                

                <div className="form-control mt-6">
                    <input
                        className="btn hover:btn-secondary mx-auto w-[300px] mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px] border-purple-200 bg-white hover:text-white"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdateSchedule;