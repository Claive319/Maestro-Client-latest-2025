import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Mainlayout = () => {
    return (
        <div>
            <Navbar className= " top-0 relative"></Navbar>
            <div className="min-h-[calc(100vh-212px)]     ">
                <div className="flex    ">
                    <Outlet></Outlet>

                </div>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default Mainlayout;