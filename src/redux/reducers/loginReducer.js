import { ActionTypes } from "../constants/ActionTypes"


const initialState = 
{
    logged:false,
    access:'',
    message:''
}

const loginReducer =(state = initialState, { type, payload }) => {
  switch (type) {

  case ActionTypes.LOGIN:

    return { ...state, logged:true,access:payload,message:''}

    case ActionTypes.LOGIN_FAIL:
        return{...state,logged:false,access:'',message:payload}

    case ActionTypes.LOGOUT:
      return{...state,logged:false,access:''}
  default:
    return state
  }
}

export default loginReducer
