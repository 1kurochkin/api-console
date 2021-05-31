import * as React from 'react';
import LoginPage from "../pages/LoginPage/LoginPage";
import ConsolePage from "../pages/ConsolePage/ConsolePage";
import {Route, Switch} from 'react-router-dom';
import "./App.styles.css"
import {COOKIE_NAMES, LOCAL_STORAGE, ROUTES} from "../constants";
import {useRoutes} from "../hooks/useRoutes";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../store";
import {useEffect} from "react";
import {sendsay} from "../api/client";
import {getCookie} from "../helpers/sendsay";
import {setIsAuthorized} from "../redux/authState/reducer";
import {getUserData} from "../redux/fetchState/reducer";


function App() {
    const isAuth = useSelector((state: storeType) => state.authState.isAuthorized)
    const routes = useRoutes(isAuth)

    const dispatch = useDispatch()

    useEffect(() => {
        const session_cookie = getCookie(COOKIE_NAMES.SENDSAY_SESSION)
        sendsay.setSessionFromCookie()
        dispatch(setIsAuthorized(!!session_cookie))
        dispatch(getUserData())
    }, [])

    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;
