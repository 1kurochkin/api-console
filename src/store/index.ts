import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import authReducer from "../redux/authState/reducer";
import consoleReducer from "../redux/consoleState/reducer";
import fetchReducer from "../redux/fetchState/reducer";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {watcherConsoleRequest, watcherGetUserData, watcherLogin, watcherLogout} from "../redux/fetchState/wathcers";

export const history = createBrowserHistory()


//-----ROOT_REDUCER----//
const rootReducer = combineReducers({
    router: connectRouter(history),
    authState:authReducer,
    consoleState:consoleReducer,
    fetchState:fetchReducer
})



//-----MIDDLEWARES----//
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];


//-----STORE----//
export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false })].concat(middlewares)
})

// @ts-ignore
window.state = store.getState()

type rootReducerType = typeof rootReducer
export type storeType = ReturnType<rootReducerType>

sagaMiddleware.run(watcherLogin)
sagaMiddleware.run(watcherLogout)
sagaMiddleware.run(watcherConsoleRequest)
sagaMiddleware.run(watcherGetUserData)

