import React,{useEffect,useRef,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import api from '../../api/api';
import {useSelector,useDispatch } from 'react-redux'
import { login } from '../../redux/actions/login';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const [errormessage, setErrormessage] = useState('');
    const [trial, setTrial] = useState(false);
    const [path,setPath]=useState('');

    const logged= useSelector(state=>state.adminLogin)
    const dispatch=useDispatch()
    const errorMessage= useRef()
    const loginBtn= useRef()
    const navigate = useNavigate();

    function handleLogin(e)
      {
          e.preventDefault();
          var formdata= new FormData(e.target)          
          dispatch(login(formdata.get('email'),formdata.get('password')))
          setTrial(true)
      }

      useEffect(() => {

        if(logged.message==''&&logged.access!='')
        {
          errorMessage.current.style.display="none"
          setErrormessage('')  
          navigate('/dashboard')        
        }  
        else
        {
          errorMessage.current.style.display="flex"
          setErrormessage(logged.message)
          setTrial(false)
        }        
       
      }, [logged]);


    
  return (
    <div className="loginFormWrapper">
        <form className='adminLoginFormWrapper' onSubmit={(e)=>handleLogin(e)}>
          
          <div className="formInputWrapper">

            <div className="loginFormInput">
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username" placeholder="Enter your username" name="email" required/>
            </div>
            <div className="loginFormInput">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" name="password" required suggested="current-password"/>
            </div>
            <button ref={loginBtn} style={{height:'60px'}}>{!trial?"Login":<Spinner animation="border" variant="light"  />}</button>
          </div>

        <div className='loginBottomMessage'>New here? <Link to="/register">Create an Account</Link></div>
        
        <div className="errorMessage" ref={errorMessage}>{errormessage}</div>
    </form>
    </div>
  )
}

export default Login