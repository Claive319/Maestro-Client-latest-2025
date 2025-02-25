import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Employee from "./Employee";



const Employees = () => {
    const showAllEmplyees = useLoaderData();
    const [emp, setEmp] = useState(showAllEmplyees);
    const [currentdept, setCurrentDept] = useState([]);
    const [currentdesig, setCurrentDesig] = useState([]);
    const [showdept, setShowDept] = useState([]);
    const [showdesig, setShowDesig] = useState([]);
    const [showtitle, setShowTitle] = useState(false)
    const [showdesigtitle, setShowDesigTitlte] = useState(false)

    const searchBtn =(event)=>{
        event.preventDefault();
        const form2 = event.target;
        const search = form2["search"].value;
        console.log(search)
        const findSearch = {
            search
        }
        console.log(findSearch)
        fetch("http://localhost:3001/employeeSearch",{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(findSearch),
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            if (search) {
                setEmp(data)
                console.log(emp)

            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to Show The Certain Employees. Please try again.",
                    icon: "error",
                    confirmButtonText: "Ok",
                });

            }
        })

    }

    useEffect(() => {
        fetch('http://localhost:3001/designations')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCurrentDesig(data);
            })
            .catch(err => console.error("Failed to fetch designations:", err));

    }, []);  // Empty array ensures this runs only once


    useEffect(() => {
        fetch('http://localhost:3001/dept')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCurrentDept(data);
            })
            .catch(err => console.error("Failed to fetch departments:", err));
    }, []);  // Empty array ensures this runs only once




    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        console.log(form)

        const dept = form["radio-dept"].value;
        const desigNew = form["radio-desig"].value;
        const selectThisEmp = {
            dept,
            desigNew
        };

        console.log(selectThisEmp)

        fetch("http://localhost:3001/employee/filter", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(selectThisEmp),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (dept && desigNew) {
                    setEmp(data)

                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to Show The Certain Employees. Please try again.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });

                }

            })

    }





    const handleDeleteEmployeeBtn = id => {
        fetch(`http://localhost:3001/employee/${id}`, {
            method: "DELETE",

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.affectedRows > 0) {
                    const remainingEmployees = emp.filter(currentEmp => currentEmp.id !== id);
                    setEmp(remainingEmployees);
                    Swal.fire({
                        title: "Success!",
                        text: "This current Employee has been Deleted from record successfully",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the Department. Please try again.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            })
    }
    return (
        <div>
            <h1 className="text-center font-bold text-2xl mb-3">Total Employees are : {emp.length}</h1>

            <div className="">
                <form onSubmit={searchBtn} className="form-control flex w-[430px] flex-row ml-60">
                    <input type="text" placeholder="Search" name="search" className="input input-bordered w-24 md:w-auto" />
                    <input type="submit" className="btn  hover:btn-secondary text-center items-center mx-auto   mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white" value="Search" />
                </form>
                <form onSubmit={onSubmit} className=" flex justify-between pb-20">
                    <div className="dropdown dropdown-bottom ml-80">
                        <div tabIndex={0} role="button" className="btn  " defaultValue="Departments">{showtitle ? showdept?.title : "Which Dept You want to See"}

                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                            {
                                currentdept.map((item, index) => <li key={index}><a className="flex gap-9"><input
                                    type="radio"
                                    value={item.department_id}
                                    onClick={() => { setShowDept(item); setShowTitle(!false) }}

                                    name="radio-dept"
                                    className="checkbox checkbox-success"
                                    // onClick={() => byDept(item.department_id)}
                                    defaultChecked={index === 1}
                                />
                                    <span className="label-text">Department : <span className="font-bold text-lg">{item.title}</span>  </span></a></li>)
                            }


                        </ul>

                    </div>
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn m-1">{showdesigtitle ? showdesig?.title : "Which Designation You want to See"}</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {
                                currentdesig.map((item, index) => <li key={index}><a className="flex gap-9"><input
                                    type="radio"
                                    value={item.designation_id}
                                    onClick={() => { setShowDesig(item); setShowDesigTitlte(!false) }}

                                    name="radio-desig"
                                    className="checkbox checkbox-success"
                                    // onClick={() => byDesig(item.designation_id, item.department)}
                                    defaultChecked
                                />
                                    <span className="label-text">Designation : <span className="font-bold text-lg">{item.title}</span>  </span></a></li>)
                            }


                        </ul>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn  hover:btn-secondary text-center items-center mx-auto w-[60px]  mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white">Go</button>

                    </div>

                </form>




            </div>
            <table >
                <thead className="bg-[#e3edf9] rounded-[6px]">
                    <tr className=" text-center px-10">
                        <th className=" text-center px-10">ID</th>
                        <th className=" text-center px-10">Name</th>
                        <th className=" text-center px-10">Username</th>
                        <th className=" text-center px-10">Department</th>
                        <th className=" text-center px-10">Create Date</th>
                        <th className=" text-center px-10">Update Date</th>
                        <th className=" text-center px-10">Designation ID</th>

                    </tr>
                </thead>
                <tbody>
                    {emp.map((employee, index) => (
                        <Employee
                            key={employee.id}
                            employee={employee}
                            index={index}
                            handleDeleteEmployeeBtn={handleDeleteEmployeeBtn}
                        />
                    ))}
                </tbody>

            </table>

            {/* <div className="card grid md:grid-cols-3  gap-12">

            </div> */}

        </div>
    );
};



export default Employees;