import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import checkLogged from "./login";
import profileReducer from "./profileReducer";



var reducers= combineReducers(
{    login:loginReducer,
     logged:checkLogged,
     profile:profileReducer
}
)

export default reducers