import React, {useCallback, useEffect, useState} from 'react';
import {Header} from "../../components/Header/Header";
import {Tabs} from "../../components/Tabs/Tabs";
import './Console.styles.css'
import {Button} from "../../components/Button/Button";
import {useController, useForm} from "react-hook-form";
import {FORM, LOCAL_STORAGE, REQUESTS} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../store";
import {postConsoleRequest} from "../../redux/fetchState/reducer";
import {
    appendRequestHistory,
    removeRequestHistory as removeRequestHistoryAC,
    setRequestHistoryError,
} from "../../redux/consoleState/reducer";
import {jsonFormat} from "../../helpers/jsonFormat";


const ConsolePage = () => {

    const loading = useSelector((state: storeType) => state.fetchState[REQUESTS.POST_CONSOLE].loading)

    const loginName = useSelector((state: storeType) => state.authState.login)
    // @ts-ignore
    // let error = useSelector((state: storeType) => state.fetchState[REQUESTS.POST_CONSOLE].error)
    const requestHistory = useSelector((state: storeType) => state.consoleState.requestHistory)


    const dispatch = useDispatch()
    const removeRequestHistory = useCallback(
        (index?:number) => dispatch(
            removeRequestHistoryAC({ index })
        ), [dispatch]
    )

    const [activeTab, setActiveTab1] = useState(0)
    const setActiveTab = (index:number) => {
        console.log("setActiveTab setActiveTabsetActiveTabsetActiveTabsetActiveTabsetActiveTabsetActiveTab")
        setActiveTab1(index)
    }

    const {setValue, handleSubmit, watch, control} = useForm();

    const {field: inputField} = useController({
        name: FORM.TEXT_AREA_INPUT.name, control
    })
    const {field: outputField} = useController({
        name: FORM.TEXT_AREA_OUTPUT.name, control
    })

    useEffect(() => {
        console.log(activeTab, "ACITVE TAB CHANGE")
        setValue(FORM.TEXT_AREA_INPUT.name, requestHistory[activeTab].input)
    }, [activeTab])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE.REQUEST_HISTORY, JSON.stringify(requestHistory))
    }, [requestHistory])

    const removeRequestHandler = (index:number) => {
        removeRequestHistory(index)
        if(index === activeTab) setActiveTab(index - 1)
    }
    const removeAllRequestsHandler = () => {
        removeRequestHistory()
        setActiveTab(0)
    }

    const onFormatterHandler = () => {
        try {
            const inputValue = inputField.value
            const json = JSON.stringify(JSON.parse(inputValue))
            const preparedJson = jsonFormat(json)
            setValue(FORM.TEXT_AREA_INPUT.name, preparedJson)
            dispatch(setRequestHistoryError({error:"", index:activeTab} ))
        } catch (error) {
            dispatch(setRequestHistoryError({error, index:activeTab} ))
        }

    }

    const onSendHandle = (index:number) => {
        console.log(index, "onSendHandle")
        try {
            const isIndexEqualToActiveTab = index === activeTab
            const input = inputField.value
            const payload = isIndexEqualToActiveTab ? JSON.parse(input) : JSON.parse(requestHistory[index].input)
            onFormatterHandler()
            console.log(payload, "onSendHandle")
            dispatch(
                appendRequestHistory({
                    action:Object.values(payload).join(), input,
                })
            )
            // @ts-ignore
            dispatch(postConsoleRequest({...payload, index: 0}))
            if(!isIndexEqualToActiveTab) {
                setValue(FORM.TEXT_AREA_INPUT.name, requestHistory[index].input)
            } else setActiveTab(0)



        } catch (error) {
            dispatch(setRequestHistoryError({error, index} ))
        }
    }

    return (
        <div className='console-page'>
            <Header login={loginName} />
            <div className="console-page__content">
                <Tabs activeTab={activeTab}
                      executeClick={onSendHandle}
                      removeRequest={removeRequestHandler}
                      removeAllRequests={removeAllRequestsHandler}
                      setActiveTab={setActiveTab}
                      control={control}
                      inputField={inputField}
                      outputField={outputField}
                      tabs={requestHistory}/>
            </div>
            <div className='console-page__footer'>
                <Button text='Отправить' loading={loading} disabled={false} onClick={handleSubmit(() => onSendHandle(activeTab))}/>
                <div className="console-page__footer__right-block">
                    <img className='console-page__footer__right-block__img' src={"/icons/format.svg"}/>
                    <span className="console-page__footer__right-block__span" onClick={onFormatterHandler}>Форматировать</span>
                </div>
            </div>
        </div>
    )
}





export default ConsolePage