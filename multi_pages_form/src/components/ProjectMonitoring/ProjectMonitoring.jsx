import React from 'react'
import Sidebar2 from './SideBar2/SideBar2'
import { Outlet } from 'react-router-dom'
import './projectmonitoring.css'

const ProjectMonitoring = () => {
  return (
    <section className='container'>
        <Sidebar2/>
        <Outlet/>
    </section>
  )
}

export default ProjectMonitoring