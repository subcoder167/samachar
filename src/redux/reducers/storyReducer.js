import { ActionTypes } from "../constants/ActionTypes";

var initialState={
    uploaded:false,
    trial:false,
    message:'',
    
}

 const registerReducer=(state=initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.UPLOAD_STORY_ATTEMPT:
            return {...state,trial:true, uploaded: false,message:'Uploading Story....'}
        case ActionTypes.UPLOAD_STORY_SUCCESS:            
            return{...state,trial:false,uploaded:true,message:"Story Uploaded successfully"}
        case ActionTypes.UPLOAD_STORY_FAIL:
            return{...state,trial:false,uploaded:false,message:payload}
    
        default:
            return state
    }
 }


 export default registerReducer