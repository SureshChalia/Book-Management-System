import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
const MainDashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  return (
    <div className="flex">
      <Sidebar sidebarToggle = {sidebarToggle}/>
      <Dashboard sidebarToggle = {sidebarToggle} setSidebarToggle = {setSidebarToggle}/>
    </div>
  )
}

export default MainDashboard