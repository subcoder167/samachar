import api from "../../api/api";
import { Authorization } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";


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