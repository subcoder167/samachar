import React,{useRef,useState,useEffect} from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import {BiLogOut,BiChevronLeft} from 'react-icons/bi'
import {FiMoreHorizontal,FiUsers,FiEdit} from 'react-icons/fi'
import {FaUserShield,FaUser,FaEquals,FaDownload} from 'react-icons/fa'
import {ImUsers,ImLocation,ImUserPlus} from 'react-icons/im'
import {TiTickOutline} from 'react-icons/ti'
import {BsPatchQuestionFill} from 'react-icons/bs'
import {HiOutlineMenuAlt3} from 'react-icons/hi'

import './Nav.css'
import logo from '../../assets/images/logo.png'
import { checkLogin, getUserData } from '../../redux/actions/login'
import { adminLogout } from '../../redux/actions/adminLogin'



const Nav = () => {
  const [open, setopen] = useState(false);
  // const [username, setUsername] = useState(localStorage.getItem('fname')+" "+localStorage.getItem('lname').charAt(0));
  const [username, setUsername] = useState();
  const [designation, setDesignation] = useState(localStorage.getItem('username'));
  const logged= useSelector(state=>state.logged.access)

  const navBar= useRef();

  const dispatch=useDispatch();
  const navigate= useNavigate()

  useEffect(() => {
    // if(!designation)
    // navigate("/")    
    // try {
    //   dispatch(getUserData())
    //   setUsername(localStorage.getItem('fname')+" "+localStorage.getItem('lname').charAt(0))
      
    // } catch (error) {
    //   console.error(error)
      
    // }
  }, [designation,username]);


  const toggleNav=()=>
  {
    setopen(!open)
    open?closeNav():openNav();
  }
  const openNav=()=>
  {
    navBar.current.classList.add('open')
  }
  const closeNav=()=>
  {
    navBar.current.classList.remove('open')
  }

const handleLogout=()=>
{
  dispatch(adminLogout())
  navigate('/');
  localStorage.clear()
}

  return (
    <>
    <div className="mobileMenu">
    <img src={logo} alt="" className='mobileNavLogo' />
    <div className="hamburgerMenu" onClick={toggleNav}>
      <HiOutlineMenuAlt3/>
    </div>
    </div>
    <section className='navBar' ref={navBar}>
   
        <img src={logo} alt="" className='navLogo' />
        <div className="navTop">
        {/* <div className="navTitle">
          Menu
        </div> */}
        <div className="navMenu">
          {/* <NavLink to="metaExperts" className="navItem" onClick={toggleNav}>
           <FaUser/> Meta Expert
          </NavLink>
          <NavLink to="experts" className="navItem" onClick={toggleNav}>
            <ImUsers/>Experts
          </NavLink>
          <NavLink to="clients" className="navItem" onClick={toggleNav}>
            <ImLocation/>Clients
          </NavLink>
          <NavLink to="customers" className="navItem" onClick={toggleNav}>
           <FiUsers/> Customers
          </NavLink>
          <NavLink to="projects" className="navItem" onClick={toggleNav}>
            <TiTickOutline/>Projects
          </NavLink>
          <NavLink to="calls" className="navItem" onClick={toggleNav}>
          <FaUserShield/> Calls
          </NavLink> */}
          <NavLink to="/dashboard/profile" className="navItem" onClick={toggleNav}>
          <ImUserPlus/> Profile
          </NavLink>
          <NavLink to="unpublishedEdits" className="navItem" onClick={toggleNav}>
          <FiEdit/> Unpublished Edits
          </NavLink>
          <NavLink to="agendas" className="navItem" onClick={toggleNav}>
          <FaEquals/>Agendas
          </NavLink>
          {/* <NavLink to="questions" className="navItem" onClick={toggleNav}>
           <BsPatchQuestionFill/> Questions
          </NavLink>
          <NavLink to="empanelments" className="navItem" onClick={toggleNav}>
           <FaDownload/> Empanelments
          </NavLink> */}
        </div>
        </div>
        <div className="navBottom">
        <div className="navTitle">
          Profile
        </div>
        <div className="profileDiv">
          <div className="profileDetailWrapper">
            <div className="profileDetailLeft">
            <div className="profileImg">
              <img src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className="profileDetail">
              <div className="username">{username}</div>
              <div className="designation">{designation}</div>
            </div>
            </div>
            <div className="profileMoreBtn">
            <FiMoreHorizontal/>
            </div>
          </div>
          <div className="profileLogOut" onClick={handleLogout}>
            <BiLogOut/> <span>Log out</span>
          </div>
        </div>
        </div>
    </section>

    </>
  )
}

export default Nav