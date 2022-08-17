import { ActionTypes } from "../constants/ActionTypes"


const initialState = 
{
    logged:false,
    access:'',
    message:''
}

const adminLoginReducer =(state = initialState, { type, payload }) => {
  switch (type) {

  case ActionTypes.ADMIN_LOGIN:

    return { ...state, logged:true,access:payload,message:''}

    case ActionTypes.ADMIN_LOGIN_FAIL:
        return{...state,logged:false,access:'',message:payload}

    case ActionTypes.ADMIN_LOGOUT:
      return{...state,logged:false,access:''}
  default:
    return state
  }
}

export default adminLoginReducer
