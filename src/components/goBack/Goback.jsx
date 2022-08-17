import React from 'react'
import {BiChevronLeft} from 'react-icons/bi'
import { Link } from 'react-router-dom'
const Goback = ({url}) => {
  return (
  //   {props?.url?<div className="goBackBtn" onClick={()=>window.history.back()}>
  //   <BiChevronLeft/>
  // </div>:<div className="goBackBtn" onClick={()=>window.history.back()}>
  //     <BiChevronLeft/>
  //   </div>}
  <>
  {url?<Link className="goBackBtn" to={url}>
    <BiChevronLeft/>
  </Link>: <div className="goBackBtn" onClick={()=>window.history.back()}>
     <BiChevronLeft/>
   </div>}
  </>  
  )

}

export default Goback