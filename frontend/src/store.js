import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer} from './redux//reducers/userReducers';
import {docsListReducer} from './redux/reducers/documentReducer';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister:  userRegisterReducer,
    docsList : docsListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ?JSON.parse(localStorage.getItem('userInfo'))
    :null;



const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;