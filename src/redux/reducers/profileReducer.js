import { ActionTypes } from "../constants/ActionTypes";

var initialState={
    updateTrial:false,
    updateError:null
}

 const profileReducer=(state=initialState,{type,payload})=>{
    switch (type) {
        // case ActionTypes.REGISTER:
        //     return {...state, register: true}
        case ActionTypes.PROFILE_UPDATE_ATTEMPT:            
            return{...state,updateTrial:true}
        case ActionTypes.PROFILE_UPDATE_SUCCESS:
            return{...state,updateTrial:false,updateError:null}
        case ActionTypes.PROFILE_UPDATE_FAIL:
            return{...state,updateTrial:false,updateError:payload}
    
        default:
            return state
    }
 }


 export default profileReducer