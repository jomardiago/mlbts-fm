import * as rosterTypes from './rosterTypes';

export const loadRosterAction = () => ({
    type: rosterTypes.LOAD_ROSTER_START
});

export const createPlayerAction = (formData, dispatch) => ({
    type: rosterTypes.CREATE_PLAYER_START,
    payload: { formData, dispatch }
});

export const updatePlayerAction = (playerId, formData, dispatch, history) => ({
    type: rosterTypes.UPDATE_PLAYER_START,
    payload: { playerId, formData, dispatch, history }
});

export const deletePlayerAction = (playerId, dispatch) => ({
    type: rosterTypes.DELETE_PLAYER_START,
    payload: { playerId, dispatch }
});