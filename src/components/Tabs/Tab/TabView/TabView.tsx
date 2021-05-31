import React from "react";
import './TabView.styles.css'
import {Controller} from "react-hook-form";
import {FORM} from "../../../../constants";


type PropsTypes = {
    error: boolean,
    inputField: any,
    outputField: any
    control: any
}

export const TabView = ({error, control, inputField, outputField}: PropsTypes) => {

    console.log('outputField ', !!error, outputField)

    return (
        <div className={`tab-view ${!!error && "tab-view-error"}`}>
            <div className="tab-view__input-field">
                <span className="tab-view__input-field__span">Запрос:</span>
                <Controller
                    control={control}
                    name={FORM.TEXT_AREA_INPUT.name}
                    render={() => <textarea
                        {...inputField}
                        className="tab-view__input-field__textarea"/>
                    }
                />
            </div>
            <div className="tab-view__input-field">
                <span className="tab-view__input-field__span">Ответ:</span>
                <Controller
                    control={control}
                    name={FORM.TEXT_AREA_OUTPUT.name}
                    render={() => <textarea readOnly value={ error ? error : outputField.value }
                                            className="tab-view__input-field__textarea"/>
                    }
                />

            </div>
        </div>
    )
}
