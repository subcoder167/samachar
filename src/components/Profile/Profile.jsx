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
  const [first,setFirst]= useState(localStorage.getItem('first_name'))
  const [last,setlast]= useState(localStorage.getItem('last_name'))
  const [username,setUsername]= useState(localStorage.getItem('username'))
  const [password, setPassword] = useState(true);
  
  const [error,setError]= useState()

  const updateState=useSelector(state=>state.profile)
  const params= useParams()
  const dispatch = useDispatch()  
  // const passwordIcon= useRef()
  const first_name = useRef()
  const last_name = useRef()
  const usernameIn = useRef()
  const submitBtn = useRef()
  useEffect(() => {
    handleProfileChange()
  }, []);

  const handleProfileSubmit=(e)=>
  {
    e.preventDefault()
    if(first_name.current.value=="" || last_name.current.value=="" || usernameIn.current.value=="")
    {
      setError('Please donot keep any empty value')
      return
    }
    setError('')

    let formData= new FormData(e.target)
    dispatch(updateProfile(formData))
  }
  const handleProfileChange=(e)=>
  {
    setError('')
    if(first_name.current.value==first && last_name.current.value==last && usernameIn.current.value==username)
    {
        submitBtn.current.disabled=true;
    } 

    else 
    {
      submitBtn.current.disabled=false;
    }
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
                    <input type="text" className="profileFormInput" defaultValue={first} name='first_name' placeholder='Enter your first name' ref={first_name} onChange={()=>handleProfileChange()} />
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">Last Name</label>
                    <label className="profileFormInputLabel mobileLabel"><FaRegUser/></label>
                    <input type="text" className="profileFormInput" defaultValue={last} name='last_name' placeholder='Enter your last name' ref={last_name} onChange={()=>handleProfileChange()} />
                  </div>
                  <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">Username</label>
                    <label className="profileFormInputLabel mobileLabel"><AiOutlineMail/></label>
                    <input type="text" className="profileFormInput"defaultValue={username} name='username' placeholder='Enter your username' ref={usernameIn} onChange={()=>handleProfileChange()} />
                  </div>
                  {/* <div className="profileFormInputWrapper">
                    <label className="profileFormInputLabel desktopLabel">password</label>
                    <label className="profileFormInputLabel mobileLabel"><RiLockPasswordLine/></label>
                    <input type={password?"password":"text"} className="profileFormInput" placeholder='Enter your password' required/>
                    <span ref={passwordIcon} className="passwordIcon" onClick={()=>setPassword(!password)} >{password?<AiFillEye/>:<AiFillEyeInvisible/>}</span>

                  </div> */}
                  <div className="errorMessage">{error}</div>
                  <div className="profileFormInputWrapper">
                    <button className="btn" ref={submitBtn}> 
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