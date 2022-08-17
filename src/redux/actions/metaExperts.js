import api from "../../api/api";
import { ActionTypes } from "../constants/ActionTypes";
import { stringifyData } from "../../functions";

export const fetchAllMeta=()=>async(dispatch)=>{
    const config=
    {
        method:'get',
        headers:{}
    }
    try
    {
        const response= await api('/meta-experts',config)
       
        dispatch(
            {
                type:ActionTypes.FETCH_ALL_META,
                payload:response.data
            }
        )
    }
    catch(err)
    {
        console.log(err)
    }
}

export const setSingleMeta=(id)=>async(dispatch)=>
{
   
    const config=
    {
        method:'get',
        headers:{}
    }
    try
    { 
        const response= await api(`/meta-experts/${id}`,config)        
            dispatch
            ({
                type:ActionTypes.SET_SINGLE_META,
                payload:response.data
            })
            
    } catch (error) {
        console.log(error.response.data);
    }
       
}

export const removeSingleMeta=()=>(dispatch)=>
{
    dispatch
        ({
            type:ActionTypes.REMOVE_SINGLE_META,
            
        })
}

export const updateMeta=(id,formData)=>async(dispatch)=>
{   
    var config=
    {
        method:'put',
        headers: { 
            'Content-Type': 'application/json'
          },
          data : JSON.stringify(formData)
    }

    try {
        const response= await api(`/meta-experts/${id}`,config)
        console.log(response)
        // console.debug(JSON.stringify(formData))
        dispatch(
            {
                type:ActionTypes.UPDATE_META,
                payload:response
                
            }
        )
    } catch (error) {
        
        dispatch(
            {
                type:ActionTypes.UPDATE_META_FAIL,
                payload:error
            }
        )
    }
}