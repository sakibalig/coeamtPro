import React from 'react'
import Navbar from '../Navbar'
import Navbar2 from '../Navbar2'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
      <>
        <Navbar/>
        <Navbar2/>
        <Outlet/>
      </>
  )
}

export default Home;