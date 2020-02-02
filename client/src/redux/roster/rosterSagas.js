import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as rosterTypes from './rosterTypes';

async function getRoster() {
    const res = await axios.get('/api/roster');
    return res.data;
}

function* loadRosterWorker() {
    try {
        const data = yield call(getRoster);
        yield put({ type: rosterTypes.LOAD_ROSTER_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: rosterTypes.LOAD_ROSTER_FAILED, payload: { msg: err.response.statusText, status: err.response.status } });
    }
}

export function* loadRosterSaga() {
    yield takeLatest(rosterTypes.LOAD_ROSTER_START, loadRosterWorker);
}