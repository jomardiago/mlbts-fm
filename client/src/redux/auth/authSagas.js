import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as authTypes from './authTypes';
import setAuthToken from '../../utils/setAuthToken';

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