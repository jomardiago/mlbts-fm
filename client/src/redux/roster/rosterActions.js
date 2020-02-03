import * as rosterTypes from './rosterTypes';

export const loadRosterAction = () => ({
    type: rosterTypes.LOAD_ROSTER_START
});

export const createPlayerAction = (formData, dispatch, history) => ({
    type: rosterTypes.CREATE_PLAYER_START,
    payload: { formData, dispatch, history }
});