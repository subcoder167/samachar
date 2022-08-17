import { ActionTypes } from "../constants/ActionTypes";

var initialState={
    access:false
}

 const registerReducer=(state=initialState,{type,payload})=>{
    switch (type) {
        // case ActionTypes.REGISTER:
        //     return {...state, register: true}
        case ActionTypes.REGISTER_SUCCESS:            
            return{...state,register:payload}
        case ActionTypes.REGISTER_FAIL:
            return{...state,register:false}
    
        default:
            return state
    }
 }


 export default registerReducer