import api from "../../api/api";
import { ActionTypes } from "../constants/ActionTypes";
import { getUserData } from "./login";


export const register=(email,password)=>async(dispatch)=>
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
        const response = await api('/register',config)
        console.log(response)
        dispatch({
            type:ActionTypes.REGISTER,
            payload:response.data.access
        })
       
        
      }     
     catch(error) {
       console.log(error.code)
       if(error.code=='ERR_NETWORK')
        dispatch(
            {
                type:ActionTypes.REGISTER_FAIL,
                payload:'Something went wrong. Please contact developers'
            }
        )
        else
        {
          dispatch(
            {
              type:ActionTypes.REGISTER_FAIL,        
              payload:error.message
            }
          )
        }
   
      };
}
