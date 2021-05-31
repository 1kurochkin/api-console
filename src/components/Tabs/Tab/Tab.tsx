import React, {createRef, DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import './Tab.styles.css'


type PropsTypes = {
    label: string
    onClick: Function
    onChangeDropDown: Function
    executeClick: Function | any
    removeRequest: Function
    isActive: boolean
    isLast: boolean
    error: boolean
    inputText: string
}

export const Tab =
    ({label, isLast, isActive, onClick, onChangeDropDown, executeClick, removeRequest, error,inputText}: PropsTypes) => {

        const [dropDown, setDropDown] = useState(false)
        const [copyMode, setCopyMode] = useState(false)
        const dropDownStateRef = useRef<any>();
        dropDownStateRef.current = dropDown

        const onCopyHandler = () => {
            console.log('onCopyHandler')

            changeDropDown(false)
            //Copy to clipboard
            navigator.clipboard.writeText(inputText).then(
                () => setCopyMode(!copyMode),
                undefined
            );
        }
        const changeDropDown = (boolean: boolean, event?:React.MouseEvent<any>) => {
            event && event.stopPropagation()
            onChangeDropDown(boolean)
            setDropDown(boolean)
        }

        const tab = useRef<any>()

        const onClickAnotherPlaceHandler = (event: MouseEvent) => {
            const isIncludesTab = event.composedPath().includes(tab.current)
            dropDownStateRef.current && !isIncludesTab && changeDropDown(false)
        }

        useEffect(() => {
            document.addEventListener('click', onClickAnotherPlaceHandler)
            return () => {
                document.removeEventListener("click", onClickAnotherPlaceHandler)
            }
        }, [])


        const onClickRemoveHandler = () => {
            removeRequest()
            setDropDown(false)
        }
        const onClickExecuteHandler = () => {
            changeDropDown(false)
            executeClick()
        }

        return (
            <div
                className={"tab-wrapper"}
                ref={tab}
            >
                <div onClick={() => onClick()}  className={`tab ${isActive && "tab-active"}`}>
                    <img className='tab__request-feedback'
                         src={
                             `${error
                                 ? '/icons/red-dot.svg'
                                 : '/icons/green-dot.svg'}`
                         }
                    />
                    <span className="tab__label">{label}</span>
                    <img
                        className='tab__options-button'
                        src='/icons/dots.svg'
                        onClick={(event) => changeDropDown(!dropDown, event)}
                    />
                </div>
                {dropDown && <div className='tab__options-list'>
                    <div onClick={ onClickExecuteHandler }>Выполнить</div>
                    <div onClick={ onCopyHandler }>Скопировать</div>
                    {!isLast && <div onClick={onClickRemoveHandler} className='tab__options-list__delete'>Удалить</div>}
                </div>}
                {
                    copyMode &&
                    <div className={`tab__copied`}>
                        <span className='tab__copied__span'>
                            Скопировано
                        </span>

                    </div>

                }
            </div>

        )
    }
