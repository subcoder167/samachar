import api from "../../api/api";
import { ActionTypes } from "../constants/ActionTypes";
import { stringifyData } from "../../functions";

export const fetchAllEmpanelments=()=>async(dispatch)=>{
    const config=
    {
        method:'get',
        headers:{}
    }
    try
    {
        const response= await api('/empanelments',config)
        dispatch(
            {
                type:ActionTypes.FETCH_ALL_EMPANELMENTS,
                payload:response.data
            }
        )
    }
    catch(err)
    {
        console.log(err)
    }
}

export const postEmpanelments=(formData)=>async(dispatch)=>
{
    
    var config=
    {
        method:'post',
        headers: { 
            'Content-Type': 'application/json'
          },
          data : stringifyData(formData)
    }

    try {
        const response= await api('/empanelments/',config)
        console.log(response.data)
        dispatch(
            {
                type:ActionTypes.POST_NEW_EMPANELMENT,
                payload:response.data
            }
        )
    } catch (error) {
        var key=error.response.data[Object.keys(error.response.data)[0]]
        dispatch(
            {
                type:ActionTypes.POST_NEW_EMPANELMENT_FAIL,
                payload:key[0]
            }
        )

    }
}

export const updateEmpanelments=(formData)=>async(dispatch)=>
{
    

    var config=
    {
        method:'put',
        headers: { 
            'Content-Type': 'application/json'
          },
          data : stringifyData(formData)
    }

    try {
        const response= await api(`/empanelments/${formData.get("id")}`,config)
        console.log(response.data)

        dispatch(
            {
                type:ActionTypes.UPDATE_EMPANELMENT,
                payload:response.data
            }
        )
        
        
    } catch (error) {
        console.log(error)
    }
}

export const setSingleEmpanelment=(formData)=>async(dispatch)=>
{
    dispatch
    ({
        type:ActionTypes.SET_SINGLE_EMPANELMENT,
        payload:{}
    })
    try {
        
            dispatch
            ({
                type:ActionTypes.SET_SINGLE_EMPANELMENT,
                payload:formData
            })
            
    } catch (error) {
        console.log(error.response.data);
    }
       
}



export const empanelmentToMeta=(formData)=>async(dispatch)=>
{
    var config=
    {
        method:'post',
        headers: { 
            'Content-Type': 'application/json'
          },
          data : JSON.parse(stringifyData(formData))
    }

    try {
        const response= await api('/empanelment-to-meta-experts/',config)
        console.log(response.data)
        dispatch(
            {
                type:ActionTypes.EMPANELMENT_TO_META,
                payload:response.data
            }
        )
    } catch (error) {
        console.log(error)
    }
}
