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
    ({label, isLast, isActive, onClick, executeClick, removeRequest, error,inputText}: PropsTypes) => {

        const [dropDown, setDropDown] = useState(false)
        const [copyMode, setCopyMode] = useState(false)
        const dropDownStateRef = useRef<any>();
        dropDownStateRef.current = dropDown
        console.log("ERRRRORRR", error)
        const onCopyHandler = () => {
            console.log('onCopyHandler')
            setCopyMode(!copyMode)
            setDropDown(false)
            //Copy to clipboard
            navigator.clipboard.writeText(inputText).then(function() {
                console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        }
        const changeDropDown = (event:React.MouseEvent<any>, boolean: boolean) => {
            event.stopPropagation()
            console.log("DROP DOWN")
            // onChangeDropDown(boolean)
            setDropDown(boolean)
        }

        const tab = useRef<any>()

        const onClickAnotherPlaceHandler = (event: MouseEvent) => {
            const isIncludesTab = event.composedPath().includes(tab.current)
            dropDownStateRef.current && !isIncludesTab && setDropDown(false)
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
            removeRequest()
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
                        onClick={(event) => changeDropDown(event, !dropDown)}
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