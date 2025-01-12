import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateDepts = () => {
    const currentDepartment = useLoaderData();
    const updateDeptbtn = event => {
        event.preventDefault();
        const form = event.target;
        const deptTitle = form.depttitle.value;
        const latestDepts = {
            deptTitle,
        };
        fetch(`http://localhost:3001/dept/${currentDepartment.department_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(latestDepts),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.affectedRows > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Department has been Updated successfully",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                    form.reset();
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to Update the Department. Please try again.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={updateDeptbtn} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Designation Tilte</span>
                    </label>
                    <input
                        type="text"
                        name="depttitle" defaultValue={currentDepartment?.title}
                        placeholder="New Designation Title"
                        className="input input-bordered"
                        required
                    />
                </div>

                <div className="form-control mt-6">
                    <input
                        className="btn join-item rounded-r-full"
                        type="submit"
                        value="Update"
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdateDepts;