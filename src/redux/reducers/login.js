import { ActionTypes } from "../constants/ActionTypes";

var initialState={
    access:false
}

 const checkLogged=(state=initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.CHECK_LOGGED:
            
            return{...state,access:payload}
    
        default:
            return state
    }
 }


 export default checkLogged