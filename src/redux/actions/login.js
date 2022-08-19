import api from "../../api/api";
import { Authorization } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";


export const login=(email,password)=>async(dispatch)=>
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
            type:ActionTypes.LOGIN,
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
                type:ActionTypes.LOGIN_FAIL,
                payload:'Something went wrong. Please contact developers'
            }
        )
        else
        {
          dispatch(
            {
              type:ActionTypes.LOGIN_FAIL,        
              payload:error.message
            }
          )
        }
   
      };
}

export const logout=()=>async(dispatch)=>
{
  dispatch(
    {
      type:ActionTypes.LOGOUT
    }
  )
  localStorage.clear()
}




export const checkLogin=()=>(dispatch)=>
{
    try
    {
        var payload;
        // 1. check if token exists. if token doesnt exist, redirect to login
        if(!localStorage.getItem('access'))
        payload=false
        else
        payload=true
        dispatch(
            {
                type:ActionTypes.CHECK_LOGGED,
                payload:true
            }
        )
        // 2. do an api call with the token to check if profile exists. if not redirect to login. 
    }catch(err)
    {
            console.log(err)
    }
}

export const getUserData=()=>async(dispatch)=>
{
    var config = {
        method: 'get',     
        headers: {}
      };
      try {
        const enrichedConfig= Authorization(config)
        const res = await api.get('/auth/get-user-info',enrichedConfig)
        if(res)
        {
            localStorage.setItem('fname',res.data.first_name)
            localStorage.setItem('lname',res.data.last_name)
        }
        
      } catch (error) {
        
      }


}