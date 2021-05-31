import {createSlice} from "@reduxjs/toolkit";
import {REQUESTS} from "../../constants";

const initialState = {
    [REQUESTS.POST_LOGIN] : {
        data: undefined,
        loading: false,
        error: ''
    },

    [REQUESTS.POST_CONSOLE] : {
        data: undefined,
        loading: false,
        error: ''
    },

    [REQUESTS.POST_LOGOUT] : {
        data: undefined,
        loading: false,
        error: ''
    },
    [REQUESTS.GET_USER_DATA] : {
        data: undefined,
        loading: false,
        error: ''
    }
}

// action, actionTypes and reducer
const slice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {
        postLogin: ({ login, sublogin, passwd }:any) => {},
        postLogout: () => {},
        getUserData: () => {},
        postConsoleRequest: ( { action } : any) => {},
        setData: (state, {payload}) => {
            console.log("setFetching", state[payload.requestName].loading, payload)
            const {requestName, loading} = payload
            state[requestName].loading = loading
        },

        setFetching: (state, {payload}) => {
            console.log("setFetching", state[payload.requestName].loading, payload)
            const {requestName, loading} = payload
            state[requestName].loading = loading
        },

        setErrorFetching: (state, {payload}) => {
            console.log("setErrorFetching", payload)
            const {requestName, error} = payload
            state[requestName].error = JSON.stringify(error)
        },

        resetToInitialFetchState: (state, {payload} : {type:string, payload: { requestName?:string }}) => {
            console.log("resetToInitialFetchState", payload)
            const {requestName} = payload
            if (requestName) {
                state[requestName].loading = false
                state[requestName].error = ""
            }
            return initialState
        }
    }
})

export const {
    setFetching,
    setErrorFetching,
    resetToInitialFetchState,
    postLogin,
    postLogout,
    getUserData,
    postConsoleRequest
} = slice.actions;
export default slice.reducer;