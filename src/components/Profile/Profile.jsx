import React,{useState,useEffect,useRef} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import {AiFillEye,AiFillEyeInvisible,AiOutlineReload,AiOutlineMail} from 'react-icons/ai'
import {FaRegUser} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'

import './Profile.css'
import Goback from '../goBack/Goback';


const Profile = () => {
  const [password, setPassword] = useState(true);
  const params= useParams()
  const dispatch = useDispatch()
  
  const passwordIcon= useRef()
return (
    <div>        
        <section className="dashboardPageWrapper profilePageWrapper">
          <h3>Setup your Profile</h3>
          <div className="profileCard">
              <div className="profileHeader">
              </div>
              <div className="profileBody">
                <div className="avatar">GG</div>
                <div className="profileForm">
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">First Name</label>
                    <label className="profileFormInputLabel mobileLabel"><FaRegUser/></label>
                    <input type="text" className="profileFormInput" name='first_name' placeholder='Enter your first name' required/>
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">Last Name</label>
                    <label className="profileFormInputLabel mobileLabel"><FaRegUser/></label>
                    <input type="text" className="profileFormInput" name='last_name' placeholder='Enter your last name' required/>
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">Username</label>
                    <label className="profileFormInputLabel mobileLabel"><AiOutlineMail/></label>
                    <input type="text" className="profileFormInput" placeholder='Enter your username' required/>
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">password</label>
                    <label className="profileFormInputLabel mobileLabel"><RiLockPasswordLine/></label>
                    <input type={password?"password":"text"} className="profileFormInput" placeholder='Enter your password' required/>
                    <span ref={passwordIcon} className="passwordIcon" onClick={()=>setPassword(!password)} >{password?<AiFillEye/>:<AiFillEyeInvisible/>}</span>

                  </div>
                  <div className="profileFormInputWrapper">
                    <button className="btn "><span><AiOutlineReload/></span>Update Profile</button>
                  </div>

                </div>
              </div>
          </div>
        </section>
    </div>
  )
}

export default Profile