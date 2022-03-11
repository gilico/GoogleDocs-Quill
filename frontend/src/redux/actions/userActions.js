import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_SUCCESS
} from "../constants/userConstants";
import axios from 'axios';

export const login = ( email, password) => async (dispatch) => {
    try 
    {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post("/api/users/login", { email, password}, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } 
    catch (err) 
    {
        console.log(err.response);
        let setError;

        if(err.response.data.errors.email)
        {
            setError = err.response.data.errors.email;
        }
        else
        {
            setError = err.response.data.errors.password;
        }


        dispatch({
            type: USER_LOGIN_FAIL,
            payload: setError
        });
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};


export const register = (name, email, password, confirmPassword) => async (dispatch) => {
    try 
    {
        dispatch({ type: USER_LOGIN_REQUEST });
        
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post("/api/users/signup", { name, email, password, confirmPassword }, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (err) 
    {
        console.log(err.response.data);
        let setError;

        if(err.response.data.errors.email)
        {
            setError = err.response.data.errors.email;
        }
        else if(err.response.data.errors.password)
        {
            setError = err.response.data.errors.password;
        }
        else
        {
            setError = err.response.data.errors.confPass
        }


        dispatch({
            type: USER_REGISTER_FAIL,
            payload: setError
        });
    }
}