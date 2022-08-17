import { combineReducers } from "redux";

import adminLoginReducer from "./adminLoginReducer";
import checkLogged from "./login";


var reducers= combineReducers(
{    adminLogin:adminLoginReducer,
     logged:checkLogged
}
)

export default reducers