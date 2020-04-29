import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('CKA_token'),
        isAuthentificated: null,
        loading: true,
        user: null,
        error: null
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    // load user 
    
    // register user

    // login user

    // logout user

    // clear errors


    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthentificated: state.isAuthentificated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;