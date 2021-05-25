import React, {useState} from "react";
import './Tabs.styles.css'
import {Tab} from "./Tab/Tab";
import {TabView} from "./Tab/TabView/TabView";


type PropsTypes = {
    tabs: Array<object>

}

export const Tabs = React.memo(
    ({tabs}: PropsTypes) => {
        const [activeTab, setActiveTab] = useState(0)
        return (
            <div className='tabs'>
                <div className="tabs__row">
                    {
                        tabs.map((t: any) => (
                            <Tab label={t.action.name} isSuccess={true} isActive={t.id === activeTab} onClick={() => {
                                setActiveTab(t.id)
                            }}/>
                        ))
                    }
                    <img className='tabs__row__reset' src="/icons/cross.svg"/>
                </div>
                <TabView text={activeTab.toString()} error={false}/>
            </div>

        )
    }
)