import api from "../../api/api";
import { ActionTypes } from "../constants/ActionTypes";
import { getUserData } from "./login";


export const adminLogin=(email,password)=>async(dispatch)=>
{
    var data = JSON.stringify({"email":email,"password":password});

      var config = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json',
          // 'Cookie': 'sessionid=axr32xft3ha32vch0cxgu7ttz2vxpupp; csrftoken=dLd04wSHvCRn3SVQz9qaZEUZ75ujHfSbdV2tt1Nx8h4fqao0LoVacpFNEAYTV0j7', 
        },
        data : data
      };
     
      try
      {
        const response = await api('',config)
        console.log(response)
        dispatch({
            type:ActionTypes.ADMIN_LOGIN,
            payload:response.data.access
        })
        localStorage.setItem('access',response.data.access)
        localStorage.setItem('refresh',response.data.refresh)
        localStorage.setItem('username',response.data.username) 
        console.log(localStorage.getItem('access'),localStorage.getItem('refresh'))
        
        getUserData()
       
        
      }     
     catch(error) {
       console.log(error.code)
       if(error.code=='ERR_NETWORK')
        dispatch(
            {
                type:ActionTypes.ADMIN_LOGIN_FAIL,
                payload:'Something went wrong. Please contact developers'
            }
        )
        else
        {
          dispatch(
            {
              type:ActionTypes.ADMIN_LOGIN_FAIL,        
              payload:error.message
            }
          )
        }
   
      };
}

export const adminLogout=()=>async(dispatch)=>
{
  dispatch(
    {
      type:ActionTypes.ADMIN_LOGOUT
    }
  )
  localStorage.clear()
}