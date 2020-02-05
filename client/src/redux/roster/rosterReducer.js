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
        case rosterTypes.CREATE_PLAYER_SUCCESS:
            return {
                ...state,
                players: [...state.players, payload],
                loading: false
            };
        case rosterTypes.UPDATE_PLAYER_SUCCESS:
            return {
                ...state,
                players: state.players.map(player => player._id === payload._id ? payload : player),
                loading: false
            }
        case rosterTypes.DELETE_PLAYER_SUCCESS:
            return {
                ...state,
                loading: false,
                players: state.players.filter(player => player._id !== payload)
            };
        case rosterTypes.CREATE_PLAYER_FAILED:
        case rosterTypes.UPDATE_PLAYER_FAILED:
        case rosterTypes.DELETE_PLAYER_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}