import api from "../../api/api";
import { Authorization, eraseAuth, getCookie } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";
import useAuth from '../../hooks/useAuth';
import { ROLES } from "../../constants/RoleConstants";
import { setCookie, eraseCookie } from '../../functions/index'
import { HTTPCONSTANT } from "../../constants/httpConstants";
// export const login=(email,password)=>async(dispatch)=>
// {
//   const { setAuth } = useAuth();
//     var data = JSON.stringify({"email":email,"password":password});

//       var config = {
//         method: 'post',
//         headers: { 
//           'Content-Type': 'application/json',
//           // 'Cookie': 'sessionid=axr32xft3ha32vch0cxgu7ttz2vxpupp; csrftoken=dLd04wSHvCRn3SVQz9qaZEUZ75ujHfSbdV2tt1Nx8h4fqao0LoVacpFNEAYTV0j7', 
//         },
//         data : data
//       };

//       try
//       {
//         const response = await api('',config)
//         console.log(response)
//         dispatch({
//             type:ActionTypes.LOGIN,
//             payload:response.data.token
//         })
//         const accessToken = response.data.token
//         const roles="Scout"
//         localStorage.setItem('token',response.data.token)
//         // localStorage.setItem('refresh',response.data.refresh)
//         localStorage.setItem('username',response.data.user.email)        
//         localStorage.setItem('first_name',response.data.user.first_name)        
//         localStorage.setItem('last_name',response.data.user.last_name)        
//         getUserData()
//         setAuth({ email, password, roles, accessToken });

//       }     
//      catch(error) {
//        console.log(error.code)
//        if(error.code=='ERR_NETWORK')
//         dispatch(
//             {
//                 type:ActionTypes.LOGIN_FAIL,
//                 payload:'Something went wrong. Please contact developers'
//             }
//         )
//         else
//         {
//           dispatch(
//             {
//               type:ActionTypes.LOGIN_FAIL,        
//               payload:error.message
//             }
//           )
//         }

//       };
// }

export const login = (data) => async (dispatch) => {
  if (getCookie('token'))
    eraseCookie('token')
  eraseAuth()
  dispatch(
    {
      type: ActionTypes.LOGIN
    }
  )
  var config = {
    method: 'post',
    data: data
  };
  try {
    const response = await api(HTTPCONSTANT.LOGIN, config
    );
    console.log(response?.data);
    //console.log(JSON.stringify(response));
    if (response?.data) {
      setCookie('token', response?.data?.token, response?.data?.expires)
      setCookie('role', response?.data?.user?.role, response?.data?.expires)
      localStorage.setItem('roles', [response?.data?.user?.role])
      localStorage.setItem('sm.token', response?.data?.token)
      localStorage.setItem('username', response?.data?.user?.email)
      localStorage.setItem('first_name', response?.data?.user?.first_name)
      localStorage.setItem('last_name', response?.data?.user?.last_name)
      dispatch(
        {
          type: ActionTypes.LOGIN_SUCCESS,
          payload: {
            accessToken: response?.data?.token,
            username: response?.data?.user?.email,
            roles: [response?.data?.user?.role],
            first_name: response?.data?.user?.first_name,
            last_name: response?.data?.user?.last_name
          }
        }
      )
      dispatch(
        {
          type: ActionTypes.SET_PROFILE,
          payload: {
            username: response?.data?.user?.email,
            roles: [ROLES.scout],
            first_name: response?.data?.user?.first_name,
            last_name: response?.data?.user?.last_name
          }
        }
      )
    }




    // navigate('/dashboard',from, { replace: true });
  } catch (err) {

    if (!err?.response) {
      dispatch(
        {
          type: ActionTypes.LOGIN_FAIL,
          payload: 'No Server Response'
        }
      )
    } else if (err.response?.status === 400) {
      dispatch(
        {
          type: ActionTypes.LOGIN_FAIL,
          payload: 'Check Credentials and Try Again'
        }
      )
    } else if (err.response?.status === 401) {
      dispatch(
        {
          type: ActionTypes.LOGIN_FAIL,
          payload: 'You Donot Have Authorization'
        }
      )
    } else {
      dispatch(
        {
          type: ActionTypes.LOGIN_FAIL,
          payload: 'Login Failed'
        }
      )
    }

  }
}
export const logout = () => async (dispatch) => {
  eraseCookie('token')
  eraseAuth()
  dispatch(
    {
      type: ActionTypes.LOGOUT
    }
  )

}




export const checkLogin = () => (dispatch) => {
  try {
    var payload = false;
    // 1. check if token exists. if token doesnt exist, redirect to login
    if (!localStorage.getItem('token'))
      payload = false
    else
      payload = true
    dispatch(
      {
        type: ActionTypes.CHECK_LOGGED,
        payload: true
      }
    )
    // 2. do an api call with the token to check if profile exists. if not redirect to login. 
  } catch (err) {
    console.log(err)
  }
}

export const getUserData = () => async (dispatch) => {
  var config = {
    method: 'get',
    headers: {}
  };
  try {
    const enrichedConfig = Authorization(config)
    const res = await api.get('/auth/get-user-info', enrichedConfig)
    if (res) {
      localStorage.setItem('fname', res.data.user.first_name)
      localStorage.setItem('lname', res.data.user.last_name)
    }

  } catch (error) {

  }


}