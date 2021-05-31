import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    login: '',
    isAuthorized: false,
}

// action, actionTypes and reducer
const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload
        },
        setUserData: (state, {payload}: {type:string, payload: string}) => {
            state.login = payload
        }
    }
});

export const { setIsAuthorized, setUserData } = slice.actions;
export default slice.reducer;