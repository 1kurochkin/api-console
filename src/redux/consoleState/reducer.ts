import {createSlice} from "@reduxjs/toolkit";
import {LOCAL_STORAGE} from "../../constants";

const initialRequestHistory = [
    {action: 'pong', input:"{\n" +
            "  \"action\":\"pong\"\n" +
            "}\n", output: "", errorRequest:"", errorJson:""},
]
const initialState = {
    requestHistory: JSON.parse(
        (localStorage.getItem(LOCAL_STORAGE.REQUEST_HISTORY) as any)
    ) || [...initialRequestHistory],

}

// action, actionTypes and reducer
const slice = createSlice({
    name: 'console',
    initialState,
    reducers: {
        // setActiveTab: (state, {payload}) => {
        //     console.log("setRequestHistoryInput", payload)
        //     const {index} = payload
        //     state.activeTab = index
        // },
        setRequestHistoryInput: (state, {payload}) => {
            console.log("setRequestHistoryInput", payload)
            const {index, input} = payload
            state.requestHistory[index].input = input
        },
        setRequestHistoryOutput: (state, {payload}) => {
            console.log("setRequestHistoryOutput", payload)
            const {index, output} = payload
            state.requestHistory[index].output = JSON.stringify(output)
        },
        setRequestHistoryErrorJson: (state, {payload}: {type:string, payload: {index:number, errorJson:string} }) => {
            console.log("setRequestHistoryErrorJson", payload)
            const {index, errorJson} = payload
            state.requestHistory[index].errorJson = errorJson ? "Bad JSON format!" : ""
        },
        setRequestHistoryErrorRequest: (state, {payload}: {type:string, payload: {index:number, errorRequest:string} }) => {
            console.log("setRequestHistoryError", payload)
            const {index, errorRequest} = payload
            state.requestHistory[index].errorRequest = errorRequest ? JSON.stringify(errorRequest) : ""
        },
        appendRequestHistory: (state, {payload}: {type:string, payload: {action:string, input:string} }):any => {
            const {action, input} = payload
            console.log("appendRequestHistory", payload)
            // const {action: {action}, input} = payload
            const prevRequestHistory = state.requestHistory
            const indexOfRequest = prevRequestHistory.findIndex( ({action}:any) => action === payload.action )
            if(indexOfRequest === -1) {
                if(prevRequestHistory.length === 15) {
                    state.requestHistory.pop()
                }
                console.log("HELLO prevRequestHistory")
                state.requestHistory.unshift({...payload, output: "", errorRequest:"", errorJson:"" })
            } else {
                [prevRequestHistory[0], prevRequestHistory[indexOfRequest]] = [prevRequestHistory[indexOfRequest], prevRequestHistory[0]]
            }
        },

        removeRequestHistory: (state, {payload}: any = {}) => {
            console.log("removeRequestHistory", payload)
            const {index:removableIndexEl} = payload
            if(removableIndexEl !== undefined) {
                state.requestHistory = state.requestHistory.filter(
                    (_:any, index:number) => index !== removableIndexEl
                )
            }
            else state.requestHistory = [state.requestHistory[0]]
        },
        resetToInitialConsoleState: () => {
            localStorage.removeItem(LOCAL_STORAGE.REQUEST_HISTORY)
            return initialState
        },
    }
});

export const {
    setRequestHistoryErrorJson,
    setRequestHistoryErrorRequest,
    setRequestHistoryInput,
    appendRequestHistory,
    removeRequestHistory,
    resetToInitialConsoleState,
    setRequestHistoryOutput
} = slice.actions;

export default slice.reducer;
