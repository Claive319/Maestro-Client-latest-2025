import { useEffect, useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'
const Home = () => {

    const getID = useLoaderData()
    console.log(getID);

    // useEffect(() => {
    //     // Fetch Designation IDs
    //     fetch('http://localhost:3001/desigDept')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setDesignations(data); 
    //         })
    //         .catch(error => console.error('Error fetching designations:', error));

    //     // Fetch Designation IDs
    //     /*fetch('http://localhost:3001/designations')
    //         .then(response => response.json())
    //         .then(data => setDesignations(data))
    //         .catch(error => console.error('Error fetching designations:', error));

    //     // Fetch Department IDs
    //     fetch('http://localhost:3001/dept')
    //         .then(response => response.json())
    //         .then(data => setDepartments(data))
    //         .catch(error => console.error('Error fetching departments:', error));*/
    // }, []);



    const handleSubmitbtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const username = form.username.value;
        const password = form.password.value;
        const designation = form["radio-desig"].value;
        const dept = form["radio-dept"].value;
        const createDate = form.cdate.value;
        const updateDate = form.udate.value;
        const addEmployee = {
            name, username, password, designation, dept, createDate, updateDate
        }
        fetch("http://localhost:3001/employee", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addEmployee)
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId != 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Employee Data Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset();
                }

            })
    }
    const handleSubmitDesignationbtn = (event) => {
        event.preventDefault();
        const form2 = event.target;
        const dTitle = form2.dtitle.value;
        const addDesignation = {
            dTitle
        }
        // console.log(dTitle)
        fetch("http://localhost:3001/saveDesig", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addDesignation)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId != 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Designation Data Added Successfully',
                        icon: 'success',
                        showCloseButton: true,

                        confirmButtonText: 'Cool'
                    })
                    form2.reset();

                }
            })

    }
    const handleSubmitDeptbtn = event => {
        event.preventDefault();
        const form = event.target;
        const deptTitle = form.depttitle.value;
        const addDept = {
            deptTitle
        }
        fetch("http://localhost:3001/addDept", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addDept)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId != 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Department Data Added Successfully',
                        icon: 'success',
                        showCloseButton: true,
                        showCancelButton: true,

                        confirmButtonText: 'Cool'
                    })
                    form.reset();
                }
            })
    }
    return (
        <div className="pb-20 grid grid-cols-3   gap-8">
            <div className="card border-2">
                <h1 className="font-extrabold text-3xl text-center">Employees</h1>
                <form onSubmit={handleSubmitbtn} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>

                        <input type="text" placeholder="Please put your name here" name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Please type your username here" name="username" className="input input-bordered" required />


                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="flex items-center">
                            <input type="password" placeholder="Please type your Password here" name="password" className="input input-bordered" required />
                            <span className="-ml-[2rem]" ><LuEyeClosed /></span>

                        </div>

                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="flex">
                        <div className="dropdown max-w-52 dropdown-hover md:mx-auto">


                            {/* <ul tabIndex={0}
    className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"></ul> */}
                            <div
                                role="button"
                                className="btn m-1 font-extrabold text-xl"> Designation Id

                                <ul
                                    className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    {getID.desig.map((item, index) => (

                                        <li key={index} tabIndex={0}>
                                            <a tabIndex={0} className="flex gap-9">
                                                <input
                                                    type="radio"
                                                    value={item.designation_id}
                                                    name="radio-desig"
                                                    className="checkbox checkbox-success"
                                                    defaultChecked
                                                />
                                                <span className="label-text">{item.title}</span>

                                            </a>
                                        </li>

                                    ))}
                                </ul>
                            </div>



                        </div>
                        <div className="dropdown max-w-52 dropdown-hover md:mx-auto">


                            
                            <div
                                role="button"
                                className="btn m-1 font-extrabold text-xl"> Department Id

                                <ul
                                    className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    {getID.dept.map((item, index) => (

                                        <li key={index} tabIndex={0}>
                                            <a tabIndex={0} className="flex gap-9">
                                                <input
                                                    type="radio"
                                                    value={item.department_id}
                                                    name="radio-dept"
                                                    className="checkbox checkbox-success"
                                                    defaultChecked
                                                />
                                                <span className="label-text">{item.title}</span>

                                            </a>
                                        </li>

                                    ))}
                                </ul>
                            </div>



                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Create Date</span>
                        </label>

                        <input type="date" className="input input-bordered" name="cdate" placeholder="Please enter your Create Date ; EG :'2012-07-14'" id="" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Update Date</span>
                        </label>


                        <input type="date" className="input input-bordered" name="udate" placeholder="Please enter your Update Date ; EG :'2012-07-14'" id="" required />
                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn  hover:btn-secondary mx-auto w-[300px]  mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>

            </div>
            <div className="card border-2">
                <h1 className="font-extrabold text-3xl text-center">Designation</h1>
                <form onSubmit={handleSubmitDesignationbtn} className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Designation TITLE</span>
                        </label>
                        <input type="text" placeholder="Please type your title here" name="dtitle" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn  hover:btn-secondary mx-auto w-[300px]  mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white"
                            type="submit"
                            value="Submit Designation"
                        />
                    </div>
                </form>

            </div>
            <div className="card border-2">
                <h1 className="font-extrabold text-3xl text-center">Department</h1>
                <form onSubmit={handleSubmitDeptbtn} className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Department Title</span>
                        </label>
                        <input type="text" placeholder="Please type your Department Title here" name="depttitle" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn  hover:btn-secondary text-center items-center mx-auto w-[300px]  mb-8 font-extrabold text-2xl -transform transform hover:scale-110 hover:shadow-xl rounded-[24px]  border-purple-200 bg-white hover:text-white"
                            type="submit"
                            value="Submit Depratment info"
                        />
                    </div>
                </form>

            </div>

        </div>
    );
};

export default Home;