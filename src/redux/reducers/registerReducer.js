import { ActionTypes } from "../constants/ActionTypes";

var initialState={
    registered:false,
    trial:false,
    message:'',
    
}

 const registerReducer=(state=initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.REGISTER_ATTEMPT:
            return {...state,trial:true, registered: false,message:''}
        case ActionTypes.REGISTER_SUCCESS:            
            return{...state,trial:false,registered:true,message:"user registered"}
        case ActionTypes.REGISTER_FAIL:
            return{...state,trial:false,register:false,message:payload}
    
        default:
            return state
    }
 }


 export default registerReducer