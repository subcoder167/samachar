import React,{useRef,useState,useEffect, Fragment} from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import {BiLogOut,BiChevronLeft} from 'react-icons/bi'
import {FiMoreHorizontal,FiUsers,FiEdit} from 'react-icons/fi'
import {FaUserShield,FaUser,FaEquals,FaDownload} from 'react-icons/fa'
import {ImUsers,ImLocation,ImUserPlus} from 'react-icons/im'
import {RiArticleLine} from 'react-icons/ri'
import {BsPatchQuestionFill} from 'react-icons/bs'
import {HiOutlineMenuAlt3} from 'react-icons/hi'

import './Nav.css'
import logo from '../../assets/images/logo.png'
import { checkLogin, getUserData } from '../../redux/actions/login'
import { logout } from '../../redux/actions/login'
import { ROLES } from '../../constants/RoleConstants'
import { getCookie } from '../../functions'



const Nav = ({role}) => {
  const [open, setopen] = useState(false);
  // const [username, setUsername] = useState(localStorage.getItem('fname')+" "+localStorage.getItem('lname').charAt(0));
  const [username, setUsername] = useState('loading');
  const [designation, setDesignation] = useState('loading');
  const state= useSelector(state=>state.profile)
  const stateLogin= useSelector(state=>state.login)

  const navBar= useRef();

  const dispatch=useDispatch();
  const navigate= useNavigate()

  useEffect(() => {
    if(state?.profile?.first_name=="" || state?.profile?.last_name=="")
    {
      navigate('/complete-profile')
    }

   console.log('in nav',role)
    setUsername(state?.profile?.first_name)
    setDesignation(getCookie('role'))
    // console.log(role)
  }, []);


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
  dispatch(logout())
  navigate('/login');
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
         {
          stateLogin?.user?.roles?.find((r)=> r.includes(ROLES.scout)||r.includes(ROLES.writer)||r.includes(ROLES.reviewer))? 
          <>
          <NavLink to="profile" className="navItem" onClick={toggleNav}>
          <ImUserPlus/> Profile
          </NavLink>
          <NavLink to="upload" className="navItem" onClick={toggleNav}>
          <FiEdit/>Upload
          </NavLink>
          </>
          : <></>}

{
          stateLogin?.user?.roles?.find((r)=> r.includes(ROLES.writer)||r.includes(ROLES.reviewer))? 
          <>
          <NavLink to="stories" className="navItem" onClick={toggleNav}>
          <RiArticleLine/> Stories
          </NavLink>
         
          </>
          : <></>}



         { stateLogin?.user?.roles?.find((r)=>r.includes(ROLES.writer)) ?
          <>
          <NavLink to="agendas" className="navItem" onClick={toggleNav}>
          <FaEquals/>Agendas
          </NavLink>
          </>
          : <></>
          }
          {stateLogin?.user?.roles?.find((r)=> r.includes(ROLES.reviewer)) ?
          <>
          <NavLink to="writer" className="navItem" onClick={toggleNav}>
          <FaEquals/>Writers
          </NavLink>
          </>
          :
          <></>
          }
          

          

        
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