
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'


const UpdateEmployee = () => {
    const currentEmployeeData = useLoaderData();

    const { id } = useParams();


    const idFind = currentEmployeeData.find(employee => String(employee.id) === String(id));
    const { name } = idFind;


    const handleFormSubmitBTN = (event) => {
        event.preventDefault();
        const form = event.target;
        const id = form.id.value;
        const inTime = form.iTime.value;
        const outTime = form.oTime.value;
        const addAttendence = {
            id, inTime, outTime
        }
        fetch('http://localhost:3001/employee/addAttendence',{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addAttendence)
        })
            .then(res => res.json())
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
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleFormSubmitBTN} className="card-body">
                <h1 className='font-semibold text-xl text-center'>{name}</h1>

                {/* <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1" defaultValue="Departments">{title ? name : "Select Employee"}

                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                        {
                            currentemployee.map((item, index) => <li key={index}><a className="flex gap-9"><input
                                type="radio"
                                value={item.id}
                                onClick={() => { setShowEmpId(item); setTitle(!false) }}

                                name="radio-dept"
                                className="checkbox checkbox-success"
                                // onClick={() => byDept(item.department_id)}
                                defaultChecked={index === 1}
                            />
                                <span className="label-text">Employee Name <span className="font-bold text-lg">{item.name}</span>  </span></a></li>)
                        }


                    </ul>

                </div> */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Employee ID</span>
                    </label>
                    <input type="number" className="input input-bordered" name='id' defaultValue={idFind?.id} placeholder="Please enter your employee ID" id="" />


                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">In-time</span>
                    </label>
                    
                    <input type="datetime-local" className="input input-bordered" placeholder="Please enter the time of your entry" name="iTime" id="" />


                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Out-time</span>
                    </label>

                    <input type="datetime-local" className="input input-bordered" placeholder="Please enter the time You are Exiting" name="oTime" id="" />
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
    );
};

export default UpdateEmployee;