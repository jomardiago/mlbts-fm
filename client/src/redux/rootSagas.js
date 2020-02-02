import { all, call } from 'redux-saga/effects';

import * as authSagas from './auth/authSagas';
import * as alertSagas from './alert/alertSagas';

export default function* rootSaga() {
    yield all([
        call(authSagas.loadUserSaga),
        call(authSagas.loginUserSaga),
        call(alertSagas.setAlert)
    ]);
}