// @ts-ignore
import {call, delay, put} from "redux-saga/effects";
import {postLogout, resetToInitialFetchState, setErrorFetching, setFetching} from "../fetchState/reducer";
import {COOKIE_NAMES, REQUESTS, ROUTES} from "../../constants";
import {requestToSendsay, sendsay} from "../../api/client";
import {push} from "connected-react-router";
import {setIsAuthorized, setUserData} from "../authState/reducer";
import {eraseCookie, setCookie} from "../../helpers/sendsay";
import {
    removeRequestHistory,
    resetToInitialConsoleState,
    setRequestHistoryErrorRequest,
    setRequestHistoryOutput
} from "../consoleState/reducer";


//LOGIN REQUEST WORKER
export type workerLoginTypes = { type: string, payload: { login:string, sublogin:string, passwd:string }}
export function* workerLogin({ type, payload }: workerLoginTypes ): any {
    //loading...
    yield put(setFetching({requestName: REQUESTS.POST_LOGIN, loading: true}))
    try {
        //login request -->
        const {session} = yield call(() => requestToSendsay("login", payload)) || {}
        console.log('WORKER LOGIN RESPONSE: ', session)
        setCookie(COOKIE_NAMES.SENDSAY_SESSION, session)
        sendsay.setSessionFromCookie()
        // document.cookie = `session=${session}; path=/; expires=${()()}`
        // Authorizing...
        yield put(setIsAuthorized(true))
        //set Login Name
        yield put(setUserData(payload.login))
        //Route to main page
        yield put(push(ROUTES.MAIN))

    } catch (error) {
        console.log('WORKER LOGIN ERROR: ', error)
        yield put(
            setErrorFetching({requestName: REQUESTS.POST_LOGIN, error: {id:error.id, explain: error.explain} })
        )
    }
    //not loading
    yield put(setFetching({requestName: REQUESTS.POST_LOGIN, loading: false}))
}


//LOGOUT REQUEST WORKER

export function* workerLogout(): any {


    //loading...
    yield put(setFetching({requestName: REQUESTS.POST_LOGOUT, loading: true}))

    try {
        //login request -->
        yield call(() => requestToSendsay("logout", {}))
        eraseCookie(COOKIE_NAMES.SENDSAY_SESSION)
        // Exit...
        yield put(setIsAuthorized(false))
        yield put(removeRequestHistory(false))
        yield put(resetToInitialFetchState({}))
        yield put(resetToInitialConsoleState())
        //Route to main page
        yield put(push(ROUTES.LOGIN))

    } catch (error) {
        yield put(
            setErrorFetching({
                requestName: REQUESTS.POST_LOGOUT,
                error:{
                    id:error.id,
                    explain:error.explain
                }
            })
        )
    }
    //not loading
    yield put(setFetching({requestName: REQUESTS.POST_LOGOUT, loading: false}))
}


//CONSOLE REQUEST WORKER
export type workerConsoleRequestType = { type: string, payload: { action: string, index:number } }
export function* workerConsoleRequest({ type, payload } : workerConsoleRequestType): any {
    console.log("workerConsoleRequest", payload)
    //loading...
    yield put(setFetching({requestName: REQUESTS.POST_CONSOLE, loading: true}))
    const { action, index, ...restPayload } = payload
    try {
        const response = yield call(() => requestToSendsay(action, restPayload)) || {}
        yield put(setRequestHistoryOutput({index, output: response }))
    } catch (error) {
        console.log('workerConsoleRequest error', error)
        yield put(setRequestHistoryErrorRequest({errorRequest:error, index} ))
        yield put(setErrorFetching({requestName: REQUESTS.POST_CONSOLE, error}))
    }
    console.log("HELLO FETCHING FLASE")
    yield put(setFetching({requestName: REQUESTS.POST_CONSOLE, loading:false}))
}

//GET USER DATA WORKER
// export type workerGetUserDataType = { type: string, payload: {} }
export function* workerGetUserData(): any {
    console.log("workerGetUserData")
    //loading...
    yield put(setFetching({requestName: REQUESTS.GET_USER_DATA, loading: true}))
    try {
        const {list} = yield call(
            () => requestToSendsay(
                "sys.settings.get",
                {list: ['about.owner.email']}
            )
        ) || {}
        const login = list['about.owner.email']
        yield put(setUserData(login))
        console.log(list)
    } catch (error) {
        yield put(postLogout())
        yield put(setErrorFetching({requestName: REQUESTS.GET_USER_DATA, error}))
    }
    yield put(setFetching({requestName: REQUESTS.GET_USER_DATA, loading:false}))
}
