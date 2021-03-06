import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as rosterTypes from './rosterTypes';
import { setAlert } from '../alert/alertActions';
import config from '../../utils/getAxiosConfig';

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

async function createPlayer(formData) {
    const res = await axios.post('/api/roster/player', formData, config);
    return res.data;
}

function* createPlayerWorker(action) {
    try {
        const player = yield call(createPlayer, action.payload.formData);
        yield put({ type: rosterTypes.CREATE_PLAYER_SUCCESS, payload: player });
        action.payload.dispatch(setAlert('Player Created', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: rosterTypes.CREATE_PLAYER_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => action.payload.dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export function* createPlayerSaga() {
    yield takeLatest(rosterTypes.CREATE_PLAYER_START, createPlayerWorker);
}

async function updatePlayer(playerId, formData) {
    const res = await axios.put(`/api/roster/player/${playerId}`, formData, config);
    return res.data;
}

function* updatePlayerWorker(action) {
    const { playerId, formData, dispatch, history } = action.payload;

    try {
        const player = yield call(updatePlayer, playerId, formData);
        yield put({ type: rosterTypes.UPDATE_PLAYER_SUCCESS, payload: player });
        dispatch(setAlert('Player Updated', 'success'));
        history.push('/roster');
    } catch (err) {
        const { statusText, status } = err.response;
        const errors = err.response.data.errors;
        yield put({ type: rosterTypes.UPDATE_PLAYER_FAILED, payload: { msg: statusText, status } });

        if (errors) {
            errors.forEach(error => action.payload.dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export function* updatePlayerSaga() {
    yield takeLatest(rosterTypes.UPDATE_PLAYER_START, updatePlayerWorker);
}

async function deletePlayer(playerId) {
    const res = await axios.delete(`/api/roster/player/${playerId}`);
    return res.data;
}

function* deletePlayerWorker(action) {
    const { playerId, dispatch } = action.payload;
    try {
        yield call(deletePlayer, playerId);
        dispatch(setAlert('Player Deleted', 'danger'));
        yield put({ type: rosterTypes.DELETE_PLAYER_SUCCESS, payload: playerId });
    } catch (err) {
        const { statusText, status } = err.response;
        yield put({ type: rosterTypes.DELETE_PLAYER_FAILED, payload: { msg: statusText, status } });
    }
}

export function* deletePlayerSaga() {
    yield takeLatest(rosterTypes.DELETE_PLAYER_START, deletePlayerWorker);
}