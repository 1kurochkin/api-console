import React from "react";
import {useSelector} from "react-redux";
import {storeType} from "./store";
import {Redirect} from "react-router-dom"


export const withAuth = (Component: any) => {

    // const isAuth = useSelector((state: storeType) => state.authState.isAuthorized)
    const isAuth = false
    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (props: any) => (
        <Component {...props} />
    )
}
