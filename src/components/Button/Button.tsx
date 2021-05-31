import * as React from "react";
import "./Button.styles.css"

type PropsType = {
    text: string
    loading: boolean
    disabled: boolean
    onClick: () => void
}

export const Button  = ( {text, loading, disabled, onClick}: PropsType) => {

    const onClickHandler = () => {
        if (loading || disabled) return
        onClick()
    }

    return (
        <div className={`button ${disabled && "button-disabled"}`} onClick={onClickHandler}>
            {loading ? "Loading..." : text}
        </div>
    )
}

