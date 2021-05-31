import React from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import {ROUTES} from "../constants";
import LoginPage from "../pages/LoginPage/LoginPage";
import ConsolePage from "../pages/ConsolePage/ConsolePage";

export const useRoutes = (isAuthenticated: boolean) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path={ROUTES.MAIN} component={ConsolePage}/>
                <Redirect to={ROUTES.MAIN}/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path={ROUTES.LOGIN} component={LoginPage}/>
            <Redirect to={ROUTES.LOGIN}/>
        </Switch>
    )
}