import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const UEmpSchedule = () => {
    const currentScheduledEmp = useLoaderData();
    const [showday, setShowDay] = useState([])
    const [showthisDay, setShowThisDay] = useState([]);
    const [showdaytitle, setShowDaysTitle] = useState(false);

    // const [selectedValues, setSelectedValues] = useState([]);
    const [showfromtime, setShowFromTime] = useState([]);
    const [showtimes, setShowTimes] = useState([]);
    const [showfromtimetitle, setShowFromTimeTitle] = useState(false);
    // const [showtotitle, setShowTotTitle] = useState(false);
    // const [showtotime, setShowToTIME] = useState([]);
    const { id } = useParams();
    const idfind = currentScheduledEmp.find(employee => String(employee.id) === String(id));
    const { name } = idfind;
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
        const daySelected = form["radio-duty"].value;
        const id = form["emp-id"].value;
        const time = form["radio-hour"].value;





        const addSchedule = {
            daySelected, id, time
        }
        console.log(addSchedule)
        fetch('http://localhost:3001/employee/empSch', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addSchedule)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId != 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Employee Work Schedule Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset();
                } else if (data.message === 'You are entering a duplicate time.') {
                    Swal.fire({
                        title: "Duplicate Time!",
                        text: "The schedule you're trying to add already exists.",
                        icon: "warning",
                        confirmButtonText: "Try Again",
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.message,
                        icon: "error",
                        confirmButtonText: "Try Again",
                    });
                }
            })

    }

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
                <div className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 font-extrabold text-xl h-[90px]"
                    >
                        {showfromtimetitle
                            ? `${showfromtime?.From_t} - ${showfromtime?.To_t}`
                            : "Duty Time"}
                    </div>

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        {showtimes.map((item, index) => {
                            let formattedTime = "Invalid Time"; // Default fallback

                            try {
                                // Parse `To_t` to convert to 12-hour AM/PM format
                                const [hours, minutes] = item.To_t.split(":").map(Number);
                                const isPM = hours >= 12;
                                const formattedHours = hours % 12 || 12; // Convert 0 or 12 to 12
                                formattedTime = `${formattedHours}:${String(minutes).padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
                            } catch (error) {
                                console.error("Error parsing time:", error);
                            }

                            return (
                                <li key={index}>
                                    <a className="flex gap-9">
                                        <input
                                            name="radio-hour"
                                            id="radio-hour"
                                            type="radio"
                                            value={item.duty_hour_id}
                                            onChange={() => {
                                                setShowFromTime(item); // Use a separate state for time
                                                setShowFromTimeTitle(true); // Update time title visibility
                                            }}
                                            className="checkbox checkbox-success"
                                        />
                                        <span className="label-text">
                                            {item.From_t + " - " + formattedTime}
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

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

export default UEmpSchedule;