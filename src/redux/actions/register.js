import api from "../../api/api";
import { ActionTypes } from "../constants/ActionTypes";
import { getUserData } from "./login";


export const register=(data)=>async(dispatch)=>
{
    
  dispatch({
    type:ActionTypes.REGISTER_ATTEMPT,
  })
      var config = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json',
        },
        data : data
      };
     
      try {
        const response = await api.post('/register/',config)

        console.log(JSON.stringify(response?.data));

          dispatch({
            type:ActionTypes.REGISTER_SUCCESS,
          })

        
    } catch (err) {
        if (!err?.response) {
            
            dispatch({
              type:ActionTypes.REGISTER_FAIL,
              payload:"No Server Response"
            })
        } else if (err.response?.status === 409) {
          
            dispatch({
              type:ActionTypes.REGISTER_FAIL,
              payload:"Username exists"
            })
        } else {
          dispatch({
            type:ActionTypes.REGISTER_FAIL,
            payload:"Registration failed"
          })
        }
        
    }
}
