import React, { useReducer } from 'react';
import axios from 'axios';
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
    const loadUser = () => {
        console.log('Load User');
    };
    
    // register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        };
    };

    // login user
    const login = () => {
        console.log('login');
    };

    // logout user
    const logout = () => {
        console.log('logout');
    };

    // clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});


    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthentificated: state.isAuthentificated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            loadUser,
            register,
            login,
            logout,
            clearErrors,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;