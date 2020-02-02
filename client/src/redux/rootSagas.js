import { all, call } from 'redux-saga/effects';

import * as authSagas from './auth/authSagas';
import * as alertSagas from './alert/alertSagas';
import * as rosterSagas from './roster/rosterSagas';

export default function* rootSaga() {
    yield all([
        call(authSagas.loadUserSaga),
        call(authSagas.loginUserSaga),
        call(rosterSagas.loadRosterSaga),
        call(alertSagas.setAlert)
    ]);
}