import { ActionTypes } from "../constants/ActionTypes";

var initialState={
    updateTrial:false,
    updateMessage:null,
    profile:null
}

 const profileReducer=(state=initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_PROFILE:
            return {...state,updateTrial:false,updateMessage:false, profile: payload}
        case ActionTypes.PROFILE_UPDATE_ATTEMPT:            
            return{...state,updateTrial:true,updateMessage:"Updating Profile..."}
        case ActionTypes.PROFILE_UPDATE_SUCCESS:
            return{...state,updateTrial:false,updateMessage:"Profile updated successfully!",profile:payload}
        case ActionTypes.PROFILE_UPDATE_FAIL:
            return{...state,updateTrial:false,updateMessage:payload}
    
        default:
            return state
    }
 }


 export default profileReducer