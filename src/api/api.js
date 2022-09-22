import axios from "axios";

export default axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
    // baseURL: 'http://147.182.236.95:8000/',
    // baseURL: 'http://264.48.186.44/',

})