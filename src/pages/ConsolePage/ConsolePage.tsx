import React from 'react';
import {Header} from "../../components/Header/Header";
import {Tabs} from "../../components/Tabs/Tabs";
import './Console.styles.css'
import {Button} from "../../components/Button/Button";


export const ConsolePage = () => {

    const tabs = [
        {id: 1, action: {name: 'track.get', description: 'track.get'}},
        {id: 2, action: {name: 'issue.send', description: 'issue.send'}},
        {id: 3, action: {name: 'pong', description: 'pong'}},
        {id: 4, action: {name: 'track.get', description: 'track.get'}},
        {id: 5, action: {name: 'stat.uni', description: 'stat.uni'}},
    ]

    const onSendHandle = () => {
        console.log('onSendHandle')
    }

    return (
        <div className='console-page'>
            <Header login='some@mail.ru' subLogin='sublogin' />
            <div className="console-page__content">
                <Tabs  tabs={tabs}/>
            </div>
            <div className='console-page__footer'>
                <Button text='Отправить' loading={false} disabled={false} onClick={onSendHandle} />
                <div className="console-page__footer__right-block">
                    <img className='console-page__footer__right-block__img' src="/icons/format.svg"/>
                    <span className="console-page__footer__right-block__span">Форматировать</span>
                </div>
            </div>
        </div>
    );
}

