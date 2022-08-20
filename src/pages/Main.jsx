import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
const Main = ({role}) => {
  return (
    <>
    <Nav role={role}/>
     <section className='mainWrapper'>
         <Outlet/>
     </section>
    </>
  )
}

export default Main