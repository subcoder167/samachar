import React,{useState,useEffect,useRef} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import {AiFillEye,AiFillEyeInvisible,AiOutlineReload,AiOutlineMail} from 'react-icons/ai'
import {FaRegUser} from 'react-icons/fa'
// import {RiLockPasswordLine} from 'react-icons/ri'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

import Goback from '../goBack/Goback';
import './Profile.css'
import { updateProfile } from '../../redux/actions/profile';

const Profile = () => {
  const [password, setPassword] = useState(true);
  const updateState=useSelector(state=>state.profile)
  const params= useParams()
  const dispatch = useDispatch()  
  // const passwordIcon= useRef()

  useEffect(() => {
    
    console.log(updateState)
  }, [updateState]);
  const handleProfileSubmit=(e)=>
  {
    e.preventDefault()
    let formData= new FormData(e.target)
    dispatch(updateProfile(formData))
  }
  
return (
    <div>        
        <section className="dashboardPageWrapper profilePageWrapper">
          <h3>Setup your Profile</h3>
          <div className="profileCard">
              <div className="profileHeader">
              </div>
              <div className="profileBody">
                <div className="avatar">GG</div>
                <form className="profileForm" onSubmit={(e)=>handleProfileSubmit(e)}>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">First Name</label>
                    <label className="profileFormInputLabel mobileLabel"><FaRegUser/></label>
                    <input type="text" className="profileFormInput" name='first_name' placeholder='Enter your first name' />
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">Last Name</label>
                    <label className="profileFormInputLabel mobileLabel"><FaRegUser/></label>
                    <input type="text" className="profileFormInput" name='last_name' placeholder='Enter your last name' />
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">Username</label>
                    <label className="profileFormInputLabel mobileLabel"><AiOutlineMail/></label>
                    <input type="text" className="profileFormInput" name='username' placeholder='Enter your username' />
                  </div>
                  {/* <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">password</label>
                    <label className="profileFormInputLabel mobileLabel"><RiLockPasswordLine/></label>
                    <input type={password?"password":"text"} className="profileFormInput" placeholder='Enter your password' required/>
                    <span ref={passwordIcon} className="passwordIcon" onClick={()=>setPassword(!password)} >{password?<AiFillEye/>:<AiFillEyeInvisible/>}</span>

                  </div> */}
                  <div className="profileFormInputWrapper">
                    <button className="btn">
                      {updateState.updateTrial?<Spinner animation="border" variant="light"  />:<><span><AiOutlineReload/></span>Update Profile</>}                      
                      </button>
                  </div>
                  <div className="errorMessage">{updateState.updateError}</div>

                </form>
              </div>
          </div>
        </section>
    </div>
  )
}

export default Profile