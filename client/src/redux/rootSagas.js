import { all, call } from 'redux-saga/effects';

import * as authSagas from './auth/authSagas';

export default function* rootSaga() {
    yield all([
        call(authSagas.loadUserSaga)
    ]);
}