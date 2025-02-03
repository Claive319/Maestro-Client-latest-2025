import { useLoaderData } from "react-router-dom";
import Attendence from "./Attendence";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import AverageAttendence from "./AverageAttendence";

const Attendences = () => {
    const showAttendence = useLoaderData();
    // const [loademp , setLoadEmp]= useState(showAttendence);
    const [matchedemp, setMatchedEmp] = useState([]);
    const [avgmatchedemp, setAvgMatchedEmp] = useState([]);
    const [clickavbtn, setClickAvBtn] = useState(false);

    const calcAvgDutyBTN = () => {
        fetch('http://localhost:3001/attendence/avg', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.length > 0) {
                    setAvgMatchedEmp(data)

                }
                else {
                    Swal.fire({
                        title: "Oh NOOO!!!!",
                        text: "Failed To get the Averge Data",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }


            })
    }
    const dateSubmitBtn = (event) => {
        event.preventDefault();

        const form = event.target;
        const date = form.date.value;
        console.log(date)

        const selectThisEmpNow = {
            date
        }
        fetch('http://localhost:3001/attendence/filter', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(selectThisEmpNow)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.length > 0) {
                    setMatchedEmp(data)
                }
                else {
                    Swal.fire({
                        title: "Oh NOOO!!!!",
                        text: "No Employees Worked On This Day",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            })
    }
    return (
        <div>
            <div>
                <form onSubmit={dateSubmitBtn} className="flex justify-between">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Please Select The Date of Employees you want to see</span>
                        </label>
                        <input type="date" className="input input-bordered" name="date" placeholder="Please which Date you Want to see Employees" id="" required />
                    </div>

                    <div className="form-control mt-6">
                        <input
                            className="btn  hover:btn-secondary mx-auto w-[300px]  mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white"
                            type="submit"
                            value="Go"
                        />
                    </div>
                </form>
            </div>
            {/* <button className="btn btn-ghost">Average Duty of All of Employees</button> */}
            <div>
                <input type="button" className="btn  hover:btn-secondary mx-auto w-[300px]  mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white" onClick={() => {
                    calcAvgDutyBTN();
                    setClickAvBtn(!clickavbtn);
                }} value="Average Duty Hours Of Employees" />
            </div>
            <table>
                <thead>
                    {clickavbtn ? (
                        <tr className="border-2">
                            
                            <th>Name</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Average Duty Hour</th>
                        </tr>
                    ) : (
                        <tr className="border-2">
                            <th>ID</th>
                            <th>Duty Hours Completed</th>
                            <th>Employee_Name</th>
                            <th>In_Time</th>
                            <th>Out_Time</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {clickavbtn
                        ? avgmatchedemp.map((att) => (
                            
                            <AverageAttendence key={att.id} att={att}></AverageAttendence>

                            // <Attendence key={index} att={att}></Attendence>

                        ))
                        : matchedemp.map((att) => (
                            <Attendence key={att.id} att={att}></Attendence>
                        ))}
                    {/* {
                        if(clickavbtn){
                            avgmatchedemp.map()

                        }
                        else{
                            matchedemp.map(att => <Attendence key={att.id} att={att}></Attendence>)

                        }
                        
                    } */}
                </tbody>

            </table>

        </div>
    );
};

export default Attendences;