import React, {useState} from "react";
import './Tab.styles.css'


type PropsTypes = {
    label: string
    onClick: Function
    isActive: boolean
    isSuccess: boolean
}

export const Tab = React.memo(
    ({label, isActive, onClick, isSuccess}: PropsTypes) => {

        const [optionsMode, setOptionsMode] = useState(false)
        const [copyMode, setCopyMode] = useState(false)

        const onCopyHandler = () => {

        }

        return (
            <div className={`tab ${isActive && "tab-active"}`}
                 onClick={() => onClick()}>
                <img className='tab__request-feedback'
                     src={`${isSuccess
                         ? '/icons/green-dot.svg'
                         : '/icons/red-dot.svg'}`}/>
                <span className="tab__label">{label}</span>
                <img className='tab__options-button' src='/icons/dots.svg' onClick={() => setOptionsMode(!optionsMode)}/>
                { optionsMode && <div className='tab__options-list'>
                    <div>Выполнить</div>
                    <div onClick={ () => setCopyMode(!copyMode) }>Скопировать</div>
                    <div>Удалить</div>
                </div> }
                { copyMode && <div className='tab__copied'>
                    <span>
                        Скопировано
                    </span>
                </div> }
            </div>
        )
    }
)