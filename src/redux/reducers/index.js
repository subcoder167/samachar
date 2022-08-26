import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import checkLogged from "./login";
import profileReducer from "./profileReducer";
import registerReducer from "./registerReducer";
import storyReducer from "./storyReducer";



var reducers= combineReducers(
{    login:loginReducer,
     register:registerReducer,
     logged:checkLogged,
     profile:profileReducer,
     story:storyReducer
}
)

export default reducers