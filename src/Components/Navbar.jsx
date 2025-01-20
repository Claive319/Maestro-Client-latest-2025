import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 gap-8 p-2 shadow">
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/employee'>Employees</NavLink>
                        <NavLink to='/designations'>Designations</NavLink>
                        <NavLink to='/dept'>Departmets</NavLink>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">MAESTRO</a>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 gap-7">
                    <li><a><NavLink className={({ isActive }) => `font-bold ${isActive ? 'text-lime-400 btn btn-primary' : 'hover:text-warning'}`} to='/'>Home</NavLink></a></li>
                    <li><a><NavLink className={({ isActive }) => `font-bold ${isActive ? 'text-lime-400 btn btn-primary' : 'hover:text-warning'}`} to='/employee'>Employees</NavLink></a></li>
                    <li><a><NavLink className={({ isActive }) => `font-bold ${isActive ? 'text-lime-400 btn btn-primary' : 'hover:text-warning'}`} to='/designations'>Designations</NavLink></a></li>
                    <li><a><NavLink className={({ isActive }) => `font-bold ${isActive ? 'text-lime-400 btn btn-primary' : 'hover:text-warning'}`} to='/dept'>Departments</NavLink></a></li>


                    
                    




                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;