import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Designation from "./Designation";
const Designations = () => {
  const showDesignations = useLoaderData();
  const [designation, setDesignation] = useState(showDesignations);
  const handleDeleteDesignationBtn = (designation_id) => {
    fetch(`http://localhost:3001/designations/${designation_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.affectedRows > 0) {
          const remainingData = designation.filter(
            (currentdata) => currentdata.designation_id !== designation_id
          );
          setDesignation(remainingData);
          Swal.fire({
            title: "Success!",
            text: "Designation has been Deleted from list successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the Designation. Please try again.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  return (
    <div>
      <h1>Total Designations :{designation.length}</h1>
      <div className="card grid md:grid-cols-3  gap-12">
        {designation.map((desgn) => (
          <Designation
            key={desgn.designation_id}
            handleDeleteDesignationBtn={handleDeleteDesignationBtn}
            desgn={desgn}
          ></Designation>
        ))}
      </div>
    </div>
  );
};

export default Designations;
