import * as authTypes from './authTypes';

export const loadUserAction = () => ({
    type: authTypes.LOAD_USER_START
});

export const loginUserAction = (email, password, dispatch) => ({
    type: authTypes.LOGIN_USER_START,
    payload: { email, password },
    dispatch
});