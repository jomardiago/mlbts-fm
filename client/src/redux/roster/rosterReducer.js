import * as rosterTypes from './rosterTypes';

const INITIAL_STATE = {
    players: [],
    loading: true,
    error: {}
};

export default function(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case rosterTypes.LOAD_ROSTER_SUCCESS:
            return {
                ...state,
                players: payload,
                loading: false
            };
        case rosterTypes.CREATE_PLAYER_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}