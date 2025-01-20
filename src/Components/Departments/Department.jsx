import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Department = ({ dept, handleDeleteDeptbtn }) => {
    const { department_id, title } = dept
    return (
        <div className="card card-compact bg-white/30  backdrop-blur-sm w-96 shadow-xl transition duration-7000 hover:scale-110 hover:shadow-2xl">
            <div className="card-body">
                <h1 className="text-center font-bold text-xl">
                    Department ID : {department_id}
                </h1>
                <h1 className="text-center font-black  text-[rgb(19,19,19)] text-2xl">
                    Department Title : {title}{" "}
                </h1>
                <div className="flex container gap-8 justify-center">
                    <Link to={`/dept/${department_id}`}><button className="btn btn-ghost">Update</button></Link>
                    <button className="btn btn-ghost" onClick={() => handleDeleteDeptbtn(department_id)}>
                        
                        <FaTrashCan />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Department;