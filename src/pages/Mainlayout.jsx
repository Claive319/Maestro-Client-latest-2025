import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Mainlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-292px)] container  mx-auto px-12">
                <div className="flex    mx-auto  justify-center pb-20">
                    <Outlet></Outlet>

                </div>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default Mainlayout;