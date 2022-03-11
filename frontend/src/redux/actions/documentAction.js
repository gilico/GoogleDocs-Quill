import axios from "axios";
import {
    DOC_CREATE_FAIL,
    DOC_CREATE_REQUEST,
    DOC_CREATE_SUCCESS,
    DOC_LIST_FAIL, 
    DOC_LIST_REQUEST, 
    DOC_LIST_SUCCESS,
    DOC_DELETE_FAIL,
    DOC_DELETE_REQUEST,
    DOC_DELETE_SUCCESS,
    DOC_UPDATE_FAIL,
    DOC_UPDATE_REQUEST,
    DOC_UPDATE_SUCCESS,

} from "../constants/documentConstants";

export const listDocs = () => async(dispatch) => {
    try 
    {
        // set the loading to true
        dispatch({type: DOC_LIST_REQUEST}); 

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { Authorization: `${user.token}`}};

        // get reauest from the api with 'config' for the auth middleware
        const data  = await axios.get("api/docs", config);
        // if the request was succesfull then will dispatch this action
        dispatch({
            type: DOC_LIST_SUCCESS,
            payload: data.data
        });
    } 
    catch (error) 
    {
        dispatch({
            type: DOC_LIST_FAIL,
            payload: error
        })
    }
}

export const createDocsAction = (title, content, userShared ) => async (dispatch) => {

    try 
    {
        dispatch({type: DOC_CREATE_REQUEST});
        
        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};
        console.log(title, content);
        const data  = await axios.post(
            "/api/docs/create",
            {title, content, userShared}, 
            config
        );

        dispatch({type: DOC_CREATE_SUCCESS, payload: data});
    } 
    catch (err) 
    {
        console.log(err.response);
        dispatch({
            type: DOC_CREATE_FAIL,
            payload: err
        })
    }
}


export const updateDocAction = (id, title, content, userShared ) => async (dispatch) => {

    try 
    {
        dispatch({type: DOC_UPDATE_REQUEST});

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.put(
            `/api/docs/${id}`,
            {title, content, userShared}, 
            config
        );
        

        dispatch({type: DOC_UPDATE_SUCCESS, payload: data});
    } 
    catch (error) 
    {
        dispatch({
            type: DOC_UPDATE_FAIL,
            payload: error
        })
    }
}

export const deleteDocAction = (id) => async (dispatch) => {

    try 
    {
        dispatch({type: DOC_DELETE_REQUEST});

        //fetching the user info from the state 
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // create an object the will caontain the token of the user
        const config = { headers: { 
            'Content-Type': 'application/json',
            Authorization: `${user.token}`
        }};

        const data  = await axios.delete(`/api/docs/create/${id}`, config);

        dispatch({type: DOC_DELETE_SUCCESS, payload: data});
    } 
    catch (error) 
    {
        dispatch({
            type: DOC_DELETE_FAIL,
            payload: error
        })
    }
}

