import api from "../../api/api";
import { HTTPCONSTANT } from "../../constants/httpConstants";
import { ROLES } from "../../constants/RoleConstants";
import { Authorization} from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";


export const getProfile=()=>async(dispatch)=>
{
          
}

export const updateProfile=(formData)=>async(dispatch)=>
{
    var config = {
        method: 'post',
        headers:
        {
            'Content-Type': 'application/json',
        },
        data : formData
      };
     
      try 
        {   
            dispatch({type:ActionTypes.PROFILE_UPDATE_ATTEMPT})
            
            const enrichedConfig = Authorization(config)
            const res= await api(HTTPCONSTANT.PROFILE_UPDATE,enrichedConfig)
            console.log(res)
            if(res)
            {
                dispatch(
                    {type:ActionTypes.PROFILE_UPDATE_SUCCESS ,
                        payload:
                        {
                            first_name:formData.get('first_name'),
                            last_name:formData.get('last_name'),
                            user_name:formData.get('username'),
                            roles:[ROLES.scout]
                        }
                })
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

