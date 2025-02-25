import { NavLink } from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa';
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);
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
                        <NavLink to='/'>DashBoard</NavLink>
                        <NavLink to='/'>DashBoard</NavLink>
                        <NavLink to='/employee'>Employees</NavLink>
                        <NavLink to='/designations'>Designations</NavLink>
                        <NavLink to='/dept'>Departmets</NavLink>
                        <NavLink to='/attendence'>Attendence</NavLink>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">MAESTRO</a>
            </div>
            <div className="absolute ">
                <div className={`h-screen w-64 bg-base-100 p-5 shadow-lg  flex flex-col fixed z-50  left-0 top-0  transition-transform duration-300  ${isOpen ? 'translate-x-0  ' : '-translate-x-64'}`}>
                    <a className="text-2xl font-bold mb-6">MAESTRO</a>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <NavLink
                                className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                to='/'>DashBoard</NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                to='/add'>Adding</NavLink>
                        </li>
                        <li>

                        </li>
                        <li>
                            <details>
                                <summary> <NavLink
                                    className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                    to='/employee'>Employees</NavLink></summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li><NavLink
                                        className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                        to='/employee/totalAttendence'>All Attendence</NavLink></li>
                                    
                                </ul>
                            </details>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                to='/designations'>Designations</NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                to='/dept'>Departments</NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `font-bold p-2 rounded ${isActive ? 'bg-lime-400 text-white' : 'hover:bg-gray-200'}`}
                                to='/attendence'>Attendence</NavLink>
                        </li>
                    </ul>
                </div>
                <button
                    className="absolute top-1/2 left-64 transform -translate-y-1/2 bg-lime-400 p-2 rounded-r-lg shadow-lg hover:bg-lime-500 transition"
                    onClick={() => setIsOpen(!isOpen)}>
                    <FaArrowRight className={`${isOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>
                <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;