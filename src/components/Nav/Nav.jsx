import React, { useRef, useState, useEffect, Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BiLogOut } from "react-icons/bi";
import { FiMoreHorizontal, FiEdit } from "react-icons/fi";
import { FaEquals } from "react-icons/fa";
import { ImUserPlus } from "react-icons/im";
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import "./Nav.css";
import logo from "../../assets/images/logo.png";
import { checkLogin, getUserData } from "../../redux/actions/login";
import { logout } from "../../redux/actions/login";
import { ROLES } from "../../constants/RoleConstants";
import { generateArray, getCookie } from "../../functions";

const Nav = ({ role }) => {
  const [open, setopen] = useState(false);
  // const [username, setUsername] = useState(localStorage.getItem('fname')+" "+localStorage.getItem('lname').charAt(0));
  const [username, setUsername] = useState("loading");
  const [designation, setDesignation] = useState("loading");
  const state = useSelector((state) => state.profile);
  const stateLogin = useSelector((state) => state.login);

  const navBar = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.profile?.first_name == "" || state?.profile?.last_name == "") {
      navigate("/complete-profile");
    }

    console.log("in nav", role);
    setUsername(
      state?.profile?.first_name || localStorage.getItem("first_name")
    );
    setDesignation(getCookie("role"));
    // console.log(role)
  }, []);

  const toggleNav = () => {
    setopen(!open);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <div className="mobileMenu">
        <img src={logo} alt="" className="mobileNavLogo" />
        <div className="hamburgerMenu" onClick={toggleNav}>
          <HiOutlineMenuAlt3 />
        </div>
      </div>
      <section className="navBar" ref={navBar}>
        {/* <div className='desktopHamburgerMenu' onClick={()=>setopen(!open)}><MdOutlineMenu size={32}/></div> */}

        <img src={logo} alt="" className="navLogo" />
        <div className="navTop">
          {/* <div className="navTitle">
          Menu
        </div> */}
          <div className="navMenu">
            {generateArray(localStorage.getItem("roles"))?.find(
              (r) =>
                r.includes(ROLES.scout) ||
                r.includes(ROLES.writer) ||
                r.includes(ROLES.reviewer)
            ) ? (
              <>
                <NavLink to="profile" className="navItem" onClick={toggleNav}>
                  <ImUserPlus />
                  <span className="openLabel">Profile</span>
                </NavLink>
                
              </>
            ) : (
              <></>
            )}
            
            {generateArray(localStorage.getItem("roles"))?.find(
              (r) => r.includes(ROLES.scout)
            ) ? (
              <>
                <NavLink to="upload" className="navItem" onClick={toggleNav}>
                  <FiEdit />
                  <span className="openLabel">Upload</span>
                </NavLink>
              </>
            ) : (
              <></>
            )}

            {generateArray(localStorage.getItem("roles"))?.find(
              (r) => r.includes(ROLES.writer) || r.includes(ROLES.reviewer)
            ) ? (
              <>
                <NavLink to="stories" className="navItem" onClick={toggleNav}>
                  <RiArticleLine />
                  <span className="openLabel"> Stories</span>
                </NavLink>
              </>
            ) : (
              <></>
            )}


            {generateArray(localStorage.getItem("roles"))?.find((r) =>
              r.includes(ROLES.writer)
            ) ? (
              <>
                <NavLink to="agendas" className="navItem" onClick={toggleNav}>
                  <FaEquals /> <span className="openLabel">Agendas</span>
                </NavLink>
              </>
            ) : (
              <></>
            )}
            {generateArray(localStorage.getItem("roles"))?.find((r) =>
              r.includes(ROLES.reviewer)
            ) ? (
              <>
                <NavLink to="writer" className="navItem" onClick={toggleNav}>
                  <FaEquals />
                  <span className="openLabel">Writers</span>
                </NavLink>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="navBottom">
          <div className="navTitle">Profile</div>
          <div className="profileDiv">
            <div className="profileDetailWrapper">
              <div className="profileDetailLeft">
                <div className="profileImg">
                  {/* <img src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
                  <img
                    src={`https://robohash.org/${localStorage.getItem(
                      "first_name"
                    )}.png?size=100x100`}
                    alt=""
                  />
                </div>
                <div className="profileDetail openLabel">
                  <div className="username">{username}</div>
                  <div className="designation">{designation}</div>
                </div>
              </div>
              {/* <div className="profileMoreBtn">
            <FiMoreHorizontal/>
            </div> */}
            </div>
            <div className="profileLogOut" onClick={handleLogout}>
              <BiLogOut /> <span className="openLabel">Log out</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
