import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarToggle, setSidebarToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    let lastPathSegment = '';

    if (location.pathname === '/') {
        lastPathSegment = 'home';
    } else {
        const pathnameSegments = location.pathname.split('/');
        const filteredSegments = pathnameSegments.filter(segment => segment && !/^[0-9a-fA-F]{24}$/.test(segment));
        lastPathSegment = filteredSegments[filteredSegments.length - 1]
    }
    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    };
    return (
        <div className='bg-gray-800 px-4 py-3 flex justify-between w-full z-50'>
            <div className='flex items-center text-2xl'>
                <IoMdMenu className='text-white me-4 cursor-pointer' onClick={() => {
                    setSidebarToggle(!sidebarToggle)
                }} />
            </div>
            <div className='mt-[6px] sm:mt-1'>
                <span className='text-white font-semibold sm:text-xl text-sm whitespace-nowrap capitalize'>{lastPathSegment}</span>
            </div>
            <div className='flex items-center gap-x-5'>
                <div className='relative right-4'>
                    <button className='text-white group pt-2'>
                        <CgProfile className='w-6 h-6' />
                        <div className='z-10 hidden absolute rounded-lg shadow w-32 group-focus:block bg-white top-full right-0 ease-in-out duration-300'>
                            <div className='py-2 text-sm text-gray-950'>
                                <div className='hover:bg-gray-200 rounded-md p-1 max-w-max mx-6 px-4'>
                                    <Link to={""}>Profile</Link>
                                </div>
                                <div className='hover:bg-gray-200 rounded-md p-1 max-w-max mx-6 px-4'>
                                    <Link to={"/"}>Setting</Link>
                                </div>
                                <div className='hover:bg-gray-200 rounded-md p-1 max-w-max mx-6 px-4 whitespace-nowrap
                                '>
                                    <span onClick={logout}>Log Out</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header