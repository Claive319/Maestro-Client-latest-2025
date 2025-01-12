import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Department from "./Department";


const Departments = () => {
    const showDepartments = useLoaderData();
    const [depts, setDepts] = useState(showDepartments);
    const handleDeleteDeptbtn = department_id => {
        fetch(`http://localhost:3001/dept/${department_id}`,{
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.affectedRows > 0) {
                    const remainingDepts = depts.filter(currentDept => currentDept.department_id !== department_id);
                    setDepts(remainingDepts);
                    Swal.fire({
                        title: "Success!",
                        text: "The Department has been Deleted from list successfully",
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
            <h1>Total Departments are : {depts.length}</h1>
            <div className="card grid md:grid-cols-3  gap-12">
                {
                    depts.map(dept=><Department key={dept.department_id} dept={dept} handleDeleteDeptbtn={handleDeleteDeptbtn}></Department>)
                }
            </div>

        </div>
    );
};

export default Departments;