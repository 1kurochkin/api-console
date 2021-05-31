import {createAsyncSaga} from "create-async-saga";
// @ts-ignore
import {takeEvery} from "redux-saga/effects";
import {workerConsoleRequest, workerGetUserData, workerLogin, workerLogout} from "./workers";
import {getUserData, postConsoleRequest, postLogin, postLogout} from "./reducer";

export function* watcherLogin() {
    yield takeEvery(postLogin.type, workerLogin);
}

export function* watcherLogout() {
    yield takeEvery(postLogout.type, workerLogout);
}

export function* watcherConsoleRequest() {
    yield takeEvery(postConsoleRequest.type, workerConsoleRequest);
}

export function* watcherGetUserData() {
    yield takeEvery(getUserData.type, workerGetUserData);
}
