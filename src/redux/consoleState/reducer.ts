import {createSlice} from "@reduxjs/toolkit";
import {LOCAL_STORAGE} from "../../constants";

const initialRequestHistory = [
    {action: 'pong', input:"{\n" +
            "  \"action\":\"pong\"\n" +
            "}\n", output: "", error:""},
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
        setRequestHistoryError: (state, {payload}: {type:string, payload: {index:number, error:string} }) => {
            console.log("setRequestHistoryError", payload)
            const {index, error} = payload
            state.requestHistory[index].error = error ? JSON.stringify(error) : ""
        },
        appendRequestHistory: (state, {payload}: {type:string, payload: {action:string, input:string} }) => {
            const {action, input} = payload
            console.log("appendRequestHistory", payload)
            // const {action: {action}, input} = payload
            const prevRequestHistory = state.requestHistory
            const indexOfRequest = prevRequestHistory.map( ({action}:any) => action ).indexOf(action)
            if(indexOfRequest === -1) {
                if(prevRequestHistory.length === 15) {
                    state.requestHistory.pop()
                }
                state.requestHistory.unshift({...payload, output: "", error:"" })
            } else {
                //[arr[2], arr[5]]  = [arr[5], arr[2]];
                [prevRequestHistory[0], prevRequestHistory[indexOfRequest]] = [prevRequestHistory[indexOfRequest], prevRequestHistory[0]]
            }
            // const newRequestHistory = prevRequestHistory.filter( (reqHistory:any) => reqHistory.action === action )
            // state.requestHistory =
            // if (state.requestHistory.length <= 15) {
            //     state.requestHistory.unshift({ ...payload, output: "", error:"" })
            // } else {
            //     console.log('MAX LENGTH OF HISTORY IS 15')
            //     //todo: index is 15 or more delete this tab
            // }
        },

                                                // {payload}: ({ type:string, payload: { index: string | number }}
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
    setRequestHistoryError,
    setRequestHistoryInput,
    appendRequestHistory,
    removeRequestHistory,
    resetToInitialConsoleState,
    setRequestHistoryOutput
} = slice.actions;

export default slice.reducer;