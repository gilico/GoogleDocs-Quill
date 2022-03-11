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


export const docsListReducer = (state = {docsList: []}, action) => {

    switch (action.type) 
    {
        case DOC_LIST_REQUEST:
            return {loading:true};

        case DOC_LIST_SUCCESS:
            return {loading:false, docsList: action.payload};

        case DOC_LIST_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}

export const docsCreateReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case DOC_CREATE_REQUEST:
            return {loading:true};

        case DOC_CREATE_SUCCESS:
            return {loading:false, success: true};

        case DOC_CREATE_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}


export const docsUpdateReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case DOC_UPDATE_REQUEST:
            return {loading:true};

        case DOC_UPDATE_SUCCESS:
            return {loading:false, success: true};

        case DOC_UPDATE_FAIL:
            return {loading:false, error: action.payload};
    
        default:
            return state;
    }
}


export const docsDeleteReducer = (state = {}, action) => {

    switch (action.type) 
    {
        case DOC_DELETE_REQUEST:
            return {loading: true};

        case DOC_DELETE_SUCCESS:
            return {loading:false, success: true};

        case DOC_DELETE_FAIL:
            return {loading: false, error: action.payload, success: false};
    
        default:
            return state;
    }
}




