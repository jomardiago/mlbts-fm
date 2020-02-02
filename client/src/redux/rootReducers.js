import { combineReducers } from 'redux';

import alert from './alert/alertReducer';
import auth from './auth/authReducer';
import roster from './roster/rosterReducer';

export default combineReducers({
    alert,
    auth,
    roster
});