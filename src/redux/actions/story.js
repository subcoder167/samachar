import api from "../../api/api";
import { HTTPCONSTANT } from "../../constants/httpConstants";
import { ROLES } from "../../constants/RoleConstants";
import { Authorization, setCookie, stringifyData } from "../../functions";
import { ActionTypes } from "../constants/ActionTypes";

export const uploadStory = (data) => async (dispatch) => {
    console.log(data)
    var config = {
        method: 'post',
        // data: JSON.stringify({ "genre": { "data": ["test"] }, "geography": "India", "uploaded_by": "source.one@gmail.com", "language": "english" }),
        data: data,
        headers:
        {
            'Content-Type': 'application/json',
        }
    };

    try {
        dispatch({ type: ActionTypes.UPLOAD_STORY_ATTEMPT })

        const enrichedConfig = Authorization(config)
        const response = await api(HTTPCONSTANT.STORY_UPLOAD, enrichedConfig);
        console.log((response?.data));
        //console.log(JSON.stringify(response));
        if (response?.data?.status !== 'False') {

            dispatch({ type: ActionTypes.UPLOAD_STORY_SUCCESS })

        }
        else if (response?.data?.status === 'False') {
            dispatch({
                type: ActionTypes.UPLOAD_STORY_FAIL,
                payload: response?.data?.detail
            })
        }




        // navigate('/dashboard',from, { replace: true });
    } catch (err) {

        if (!err?.response) {
            dispatch(
                {
                    type: ActionTypes.UPLOAD_STORY_FAIL,
                    payload: 'No Server Response'
                }
            )
        } else if (err.response?.status === 400) {
            dispatch(
                {
                    type: ActionTypes.UPLOAD_STORY_FAIL,
                    payload: 'Bad Request'
                }
            )
        } else if (err.response?.status === 401) {
            dispatch(
                {
                    type: ActionTypes.UPLOAD_STORY_FAIL,
                    payload: 'You Donot Have Authorization'
                }
            )
        } else {
            dispatch(
                {
                    type: ActionTypes.UPLOAD_STORY_FAIL,
                    payload: 'Couldnt Upload Story! Try again later'
                }
            )
        }

    }
}

export const fetchStory = () => async (dispatch) => {
    var config = {
        method: 'get',
        headers:
        {
            'Content-Type': 'application/json',
        }
    };

    try {
        dispatch({ type: ActionTypes.FETCH_ALL_STORIES_ATTEMPT })

        const enrichedConfig = Authorization(config)
        const response = await api(HTTPCONSTANT.FETCH_ALL_STORY, enrichedConfig);
        console.log((response));
        if (response?.data) {
            dispatch(
                {
                    type: ActionTypes.FETCH_ALL_STORIES_SUCCESS,
                    payload: response?.data
                }
            )
        }
    } catch (err) {

        if (!err?.response) {
            dispatch(
                {
                    type: ActionTypes.FETCH_ALL_STORIES_FAIL,
                    payload: 'No Server Response'
                }
            )
        } else if (err.response?.status === 400) {
            dispatch(
                {
                    type: ActionTypes.FETCH_ALL_STORIES_FAIL,
                    payload: 'Bad Reequest'
                }
            )
        } else if (err.response?.status === 401) {
            dispatch(
                {
                    type: ActionTypes.FETCH_ALL_STORIES_FAIL,
                    payload: 'You Donot Have Authorization'
                }
            )
        } else {
            dispatch(
                {
                    type: ActionTypes.FETCH_ALL_STORIES_FAIL,
                    payload: 'Something went wrong! Try again later'
                }
            )
        }

    }
}