import React, {useState} from "react";
import './Tabs.styles.css'
import {Tab} from "./Tab/Tab";
import {TabView} from "./Tab/TabView/TabView";
import {useDispatch} from "react-redux";
import {removeRequestHistory} from "../../redux/consoleState/reducer";
import {jsonFormat} from "../../helpers/jsonFormat";


type PropsTypes = {
    tabs: Array<object>
    outputField: any
    inputField: any
    control: any,
    removeRequest: Function
    removeAllRequests: Function
    executeClick: Function
    setActiveTab: Function
    activeTab: number | string
    // error: any
}


export const Tabs =
    (props: PropsTypes) => {
        const {tabs, inputField, removeRequest, executeClick, removeAllRequests, outputField, control, setActiveTab, activeTab} = props
        const [isOpenTab, setIsOpenTab] = useState(false)
        return (
            <div className={"tabs"}>
                <div
                    // style={{overflowY: isOpenTab ? "hidden" : "scroll"}}
                    className='tabs__row'
                >
                    <div
                        style={{zIndex:isOpenTab ? 10 : 0 }}
                        className={'tabs__row__absolute'}
                    >
                        {tabs.map((t: any, index) => (
                            <Tab key={t.id}
                                 executeClick={() => executeClick(index)}
                                 inputText={t.input}
                                 isLast={index === 0}
                                 removeRequest={() => removeRequest(index)}
                                 onChangeDropDown={(isOpenTab:boolean) => setIsOpenTab(isOpenTab)}
                                 label={t.action}
                                 error={t.errorRequest}
                                 isActive={index === activeTab}
                                 onClick={() => setActiveTab(index)}
                            />
                        ))
                        }
                    </div>

                </div>

                {tabs.map((t: any, index) => (
                    activeTab === index ? <TabView control={control}
                                                  inputField={inputField}
                                                  outputField={{...outputField, value: jsonFormat(t.output)}}
                                                  error={t.errorJson}
                    /> : null
                ))
                }
                <img className='tabs__row__reset' src="/icons/cross.svg" onClick={ () => removeAllRequests() } />
            </div>
        )
    }
