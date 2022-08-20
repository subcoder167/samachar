import React,{useEffect,useRef,useState} from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import api from '../../api/api';
import {useSelector,useDispatch } from 'react-redux'
import { register } from '../../redux/actions/register';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const [errormessage, setErrormessage] = useState('');
    const [trial, setTrial] = useState(false);
    const [path,setPath]=useState('');

    const state= useSelector(state=>state.register)
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();
    const loginBtn = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])

  useEffect(() => {
    setTrial(state?.trial)
    setErrMsg(state?.message)
      // navigate('/dashboard',from, { replace: true });
   
 
    return () => {
      setTrial(false)
    };
  }, [state]);




    function handleRegister(e)
      {
          e.preventDefault();
          var data= new FormData(e.target)          
          dispatch(register(data))
          
      }




    
  return (
    <div className="loginFormWrapper">
    <form className='userLoginFormWrapper' onSubmit={(e)=>handleRegister(e)}>
      
      <div className="formInputWrapper">

        <div className="loginFormInput">
        <label htmlFor="username">USERNAME</label>
        <input ref={userRef} type="text" id="username" placeholder="Enter your username" name="email" required/>
        </div>
        <div className="loginFormInput">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" name="password" required onChange={(e) => setPwd(e.target.value)}
                        value={pwd}/>
        </div>
        <button ref={loginBtn} style={{height:'60px'}}>{!trial?"Register":<Spinner animation="border" variant="light"  />}</button>
      </div>

    <div className='loginBottomMessage'>Already Have an Account? <Link to="/login">Login</Link></div>
    
    <div className="errorMessage" ref={errRef}>{errMsg}</div>
    </form>
  </div>
  )
}

export default Login