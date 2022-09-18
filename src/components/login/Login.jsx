import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux/es/exports';

import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../../redux/actions/login';

const Login = () => {
    const [trial,setTrial]=useState(false)



    const navigate = useNavigate();
    const location = useLocation();
    const dispatch= useDispatch()

    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();
    const loginBtn = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const state = useSelector(state=>state.login)
  useEffect(() => {
    if (localStorage.getItem('sm.token') && localStorage.getItem('roles'))
        console.log('authed')
            // navigate('/dashboard')
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
      setTrial(state?.trial)
      setErrMsg(state?.message)
      if(state?.logged===true)
      {
        let userObj={}
        let user= state?.user?.email
        let token= state?.token
        let roles=["scout"]
        setUser('')
        setPwd('')
        // setAuth({ user,roles, token });       
        navigate('/dashboard',from, { replace: true });
      }
   
      return () => {
        setTrial(false)
      };
    }, [state]);



    const handleLogin = async (e) => {
        e.preventDefault()
        var data= new FormData(e.target)
        dispatch(login(data))
        
      
    }

    return (
      <>  
          <div className="loginFormWrapper">
            <form className='userLoginFormWrapper' onSubmit={(e)=>handleLogin(e)}>
              
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
                <button ref={loginBtn} style={{height:'60px'}}>{!trial?"Login":<Spinner animation="border" variant="light"  />}</button>
              </div>

            <div className='loginBottomMessage'>New here? <Link to="/register">Create an Account</Link></div>
            
            <div className="errorMessage" ref={errRef}>{errMsg}</div>
            </form>
          </div>
      </>
    )
}

export default Login
