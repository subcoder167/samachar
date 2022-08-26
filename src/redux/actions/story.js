import api from "../../api/api";
import { HTTPCONSTANT } from "../../constants/httpConstants";
import { ROLES } from "../../constants/RoleConstants";
import { Authorization, setCookie, stringifyData } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";

export const uploadStory=(data)=>async(dispatch)=>
{   
    var config = {
        method: 'post',
        data : data,
        headers:
            {
                'Content-Type': 'application/json',
            }
      };
    console.log(Authorization(config))
    // try {
    //     dispatch({type:ActionTypes.UPLOAD_STORY_ATTEMPT})
    //     console.log(Authorization(config))
    //     // const enrichedConfig= Authorization(config)
    //     // const response = await api(HTTPCONSTANT.SCOUT_UPLOAD,config);
    //     // console.log(JSON.stringify(response?.data));
    //     // //console.log(JSON.stringify(response));
    //     // if(response?.data)
    //     // {
          
    //     //   dispatch({type:ActionTypes.UPLOAD_STORY_SUCCESS})
          
    //     // }
        
       
        
        
    //     // navigate('/dashboard',from, { replace: true });
    // } catch (err) {
      
    //     if (!err?.response) {
    //       dispatch(
    //         {
    //             type:ActionTypes.UPLOAD_STORY_FAIL,
    //             payload:'No Server Response'
    //         }
    //     )
    //     } else if (err.response?.status === 400) {
    //       dispatch(
    //         {
    //             type:ActionTypes.UPLOAD_STORY_FAIL,
    //             payload:'Check Credentials and Try Again'
    //         }
    //     )
    //     } else if (err.response?.status === 401) {
    //       dispatch(
    //         {
    //             type:ActionTypes.UPLOAD_STORY_FAIL,
    //             payload:'You Donot Have Authorization'
    //         }
    //     )
    //     } else {
    //       dispatch(
    //         {
    //             type:ActionTypes.UPLOAD_STORY_FAIL,
    //             payload:'Login Failed'
    //         }
    //     )
    //     }
       
    // }
}