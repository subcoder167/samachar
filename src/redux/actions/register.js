import api from "../../api/api";
import { HTTPCONSTANT } from "../../constants/httpConstants";
import { stringifyData } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";
import { getUserData } from "./login";


export const register = (formdata) => async (dispatch) => {

  dispatch({
    type: ActionTypes.REGISTER_ATTEMPT,
  })

  var data = new FormData();
  data.append('email', formdata.get('email'));
  data.append('password', formdata.get('password'));

  var config = {
    method: 'post',
    headers:
    {
      'Content-Type': 'application/json',
    },
    data: formdata
  };
  try {
    const response = await api('/register/', config)

    console.log(JSON.stringify(response?.data));

    if (response?.data?.detail === "Email already have account associated. Kindly try forgot password")
      dispatch({
        type: ActionTypes.REGISTER_FAIL,
        payload: "User already exists"
      })
    else if (response?.data?.detail === "Congrats, user has been created.")
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS
      })


  } catch (err) {
    if (!err?.response) {

      dispatch({
        type: ActionTypes.REGISTER_FAIL,
        payload: "No Server Response"
      })
    } else if (err.response?.status === 409) {

      dispatch({
        type: ActionTypes.REGISTER_FAIL,
        payload: "Username exists"
      })
    } else {
      dispatch({
        type: ActionTypes.REGISTER_FAIL,
        payload: "Registration failed"
      })
    }

  }
}
