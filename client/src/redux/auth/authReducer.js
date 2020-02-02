import * as authTypes from './authTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case authTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case authTypes.LOGIN_USER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case authTypes.AUTHENTICATION_FAILED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}