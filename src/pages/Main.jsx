import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
const Main = () => {
  return (
    <>
    <Nav/>
     <section className='mainWrapper'>
         <Outlet/>
     </section>
    </>
  )
}

export default Main