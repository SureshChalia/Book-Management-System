import React, { useState } from 'react';
import { sidebarLinks } from '../data/Dashboardlinks';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";
import {jwtDecode} from 'jwt-decode';

const Sidebar = ({ sidebarToggle }) => {
    const [openCategories, setOpenCategories] = useState([]);
    const token = localStorage.getItem('token');
    let Role = '';

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            Role = decodedToken.role;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const authorLinks = sidebarLinks.filter(link =>
        ["Author", "Add Book", "All Books"].includes(link.name)
    );

    const adminLinks = sidebarLinks.filter(link =>
        ["Admin", "Book Authors", "Category", "Books"].includes(link.name)
    );

    const filteredLinks = Role === 'Admin' ? adminLinks : authorLinks;

    const toggleCategory = (categoryId) => {
        if (openCategories.includes(categoryId)) {
            setOpenCategories(openCategories.filter(id => id !== categoryId));
        } else {
            setOpenCategories([...openCategories, categoryId]);
        }
    };

    return (
        <div className={`${sidebarToggle ? "hidden " : " block bg-gray-800 h-full w-52 fixed px-4"}`}>
            <div className='w-28 h-14 pt-2 mt-1'>
                <img src={logo} alt="Logo" />
            </div>
            <hr />
            <div className='flex flex-col text-white gap-[0.4rem] h-[85vh] overflow-y-auto sidebarScroll'>
                {filteredLinks.map((link) => (
                    <div className='text-white pt-2' key={link.id}>
                        <div className='hover:cursor-pointer'>
                            <div className={`flex gap-2 hover:bg-gray-400 rounded-md p-1 max-w-max`}
                                onClick={() => toggleCategory(link.id)}>
                                <div className={`px-2 text-2xl flex items-center justify-center gap-2`}>
                                    <NavLink to={link.path}>{link.icon}</NavLink>
                                    <span className={`text-base origin-left duration-200 whitespace-nowrap`}>
                                        <NavLink to={link.path}>{link.name}</NavLink>
                                    </span>
                                </div>
                                {link.subcategories && link.subcategories.length > 0 && (
                                    <div className={`mt-[5px]`}>
                                        <IoIosArrowForward />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
