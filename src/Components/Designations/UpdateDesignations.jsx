import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateDesignations = () => {
  const currentDesignations = useLoaderData();

  console.log(currentDesignations)
  const updateBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const dTitle = form.dtitle.value;
    const latestDesignation = {
        dTitle,
    };
    fetch(
      `http://localhost:3001/designations/${currentDesignations.designation_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(latestDesignation),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.affectedRows > 0) {
          Swal.fire({
            title: "Success!",
            text: "Designation has been Updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          form.reset();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to Update the Designation. Please try again.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={updateBtn} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Designation Tilte</span>
          </label>
          <input
            type="text"
            name="dtitle" defaultValue={currentDesignations?.title}
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

export default UpdateDesignations;
