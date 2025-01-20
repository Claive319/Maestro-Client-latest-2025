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
    const [showdesig, setShowDesig]= useState([]);
    const [showtitle, setShowTitle] = useState(false)
    const [showdesigtitle, setShowDesigTitlte] = useState(false)

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
        // fetch("http://localhost:3001/employee/filter", {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     body: JSON.stringify(selectThisEmp),
        // })
        //     .this(res => res.json())
        //     .ths(data => {
        //         if (currentdept && currentdesig) {
        //             setEmp(data)

        //         }
        //         else {
        //             Swal.fire({
        //                 title: "Error!",
        //                 text: "Failed to Show The Certain Employees. Please try again.",
        //                 icon: "error",
        //                 confirmButtonText: "Ok",
        //             });
        //         }

        //     })

    }







    // const byDesig = (desID, deptID) => {
    //     console.log(desID)




    //     fetch(`http://localhost:3001/desigDept/filter`, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //         body: JSON.stringify({ "desig": desID, "dept": deptID })
    //     })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 console.log(">>" + result)
    //                 setEmp(result)

    //             },

    //         )

    // }

    // const byDept = (desID) => {
    //     console.log(desID)




    //     fetch(`http://localhost:3001/employee/filterDept`, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //         body: JSON.stringify({ "dept": desID, })
    //     })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 console.log(">>" + result)
    //                 setEmp(result)

    //             },

    //         )

    // }



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
            <h1 className="text-center font-bold text-2xl">Total Employees are : {emp.length}</h1>
            <div className="">
                <form onSubmit={onSubmit} className=" flex justify-between pb-20">
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn m-1" defaultValue="Departments">{showtitle ? showdept?.title : "Which Dept You want to See"}

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
                                    onClick={()=>{setShowDesig(item);setShowDesigTitlte(!false)}}
                                    
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
                <thead>
                    <tr className="border-2">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Create Date</th>
                        <th>Update Date</th>
                        <th>Designation ID</th>

                    </tr>
                </thead>
                <tbody >

                    {
                        emp.map(employee => <Employee key={employee.id} handleDeleteEmployeeBtn={handleDeleteEmployeeBtn} employee={employee}></Employee>)
                    }




                </tbody>
            </table>

            {/* <div className="card grid md:grid-cols-3  gap-12">

            </div> */}

        </div>
    );
};



export default Employees;