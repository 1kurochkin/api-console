import React from "react";
import './TabView.styles.css'


type PropsTypes = {
    text: string
    error: boolean
}

export const TabView = React.memo(
    ({ text, error }: PropsTypes) => {

        return (
            <div className={`tab-view ${error && "tab-view-error"}`}>

                <div className="tab-view__input-field">
                    <span className="tab-view__input-field__span">Запрос:</span>
                    <input className="tab-view__input-field__input" value={text}/>
                </div>
                <div className="tab-view__input-field">
                    <span className="tab-view__input-field__span">Ответ:</span>
                    <input className="tab-view__input-field__input"/>
                </div>
            </div>
        )
    }
)