import React,{useState, useEffect} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarWidth = 208;
    const headerWidth = sidebarToggle ? windowWidth  : windowWidth - sidebarWidth ;
    return (
        <div className={`${sidebarToggle ? "" : "ml-52"} w-full ease-in-out duration-300 flex flex-col min-h-screen overflow-x-hidden`}>
            <div className="fixed top-0 z-10 " style={{ width: headerWidth }}>
                <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>
            <div className="w-full flex-grow  overflow-y-auto mt-[3.7rem] mb-[3.7rem]">
                <Outlet />
            </div>
            <div className="fixed bottom-0 z-10" style={{ width: headerWidth }}>
                <Footer/>
            </div>
        </div>
    )
}

export default Dashboard