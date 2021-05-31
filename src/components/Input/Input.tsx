import * as React from "react";
import {InternalFieldName} from "react-hook-form/dist/types/fields";
import {ChangeHandler, RefCallBack} from "react-hook-form/dist/types/form";
import "./Input.styles.css"

type PropsTypes = {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: RefCallBack;
    name: InternalFieldName;
    label: string
    optional?: boolean
    error:boolean
    type?: string
}

const Input  = (props: PropsTypes) => {
    const {error} = props
    return (
        <div className={`input-wrapper ${error && "input-wrapper-error"}`}>

            <div className='input-wrapper__head'>
                <label  className='input-wrapper__header__label'>{props.label}</label>
                {props.optional && <span className='input-wrapper__header__optional'>Опционально</span>}
            </div>

            <div className="input-wrapper__body">
                <input {...props} className='input-wrapper__input'/>
            </div>
        </div>
    )
}

export default Input
