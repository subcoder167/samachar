import { ActionTypes } from "../constants/ActionTypes"


const initialState = 
{
    logged:false,
    trial:false,
    access:'',
    message:'',
    user:null
}

const loginReducer =(state = initialState, { type, payload }) => {
  switch (type) {

  case ActionTypes.LOGIN:
    return { ...state, trial:true,logged:false,access:'',message:'',user:null}

    case ActionTypes.LOGIN_SUCCESS:
        return{...state,trial:false, logged:true,access:'',message:'login Success',user:payload}

    case ActionTypes.LOGIN_FAIL:
        return{...state,trial:false,logged:false,access:'',message:payload,user:null}

    case ActionTypes.LOGOUT:
      return{...state,trial:false,logged:false,access:'',message:'',user:null}
  default:
    return state
  }
}

export default loginReducer
