import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as authTypes from './authTypes';
import setAuthToken from '../../utils/setAuthToken';
import config from '../../utils/getAxiosConfig';
import { setAlert } from '../alert/alertActions';

async function getUser() {
    const res = await axios.get('/api/auth');
    return res.data;
}

function* loadUserWorker(action) {
    console.log('loadUserWorker hit: ', action);
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

    try {
        const data = yield call(getUser);
        yield put({ type: authTypes.LOAD_USER_SUCCESS, payload: data });
    } catch (err) {
        console.log(err);
        yield put({ type: authTypes.LOAD_USER_FAILED });
    }
}

export function* loadUserSaga() {
    yield takeLatest(authTypes.LOAD_USER_START, loadUserWorker);
}

async function loginUser(body) {
    const res = await axios.post('/api/auth', body, config);
    return res.data;
}

function* loginUserWorker(action) {
    console.log('loginUserWorker hit: ', action);

    const body = JSON.stringify({ ...action.payload });
    try {
        const data = yield call(loginUser, body);
        yield put({ type: authTypes.LOGIN_USER_SUCCESS, payload: data });
        yield put({ type: authTypes.LOAD_USER_START });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => action.dispatch(setAlert(error.msg, 'danger')));
        }

        yield put({ type: authTypes.LOGIN_USER_FAILED });
    }
}

export function* loginUserSaga() {
    yield takeLatest(authTypes.LOGIN_USER_START, loginUserWorker);
}