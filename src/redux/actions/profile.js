import api from "../../api/api";
import { Authorization } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";


export const getProfile=()=>async(dispatch)=>
{
          
}

export const updateProfile=(formData)=>async(dispatch)=>
{
    var config = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json',
        },
        data : formData
      };
     
      try 
        {   
            dispatch({type:ActionTypes.PROFILE_UPDATE_ATTEMPT})
            const enrichedConfig = Authorization(config)
            const res= await api("/profile_update/",enrichedConfig)
            console.log(res)
            if(res)
            {
                dispatch({type:ActionTypes.PROFILE_UPDATE_SUCCESS})
            }
            
        } catch (error) {
            if(error.code ==="ERR_NETWORK")
            dispatch({
                type:ActionTypes.PROFILE_UPDATE_FAIL,
                payload:"Network Error"
            })
            else
            {
                dispatch({type:ActionTypes.PROFILE_UPDATE_FAIL,payload:"Something went wrong!"})
            }
        }
}

