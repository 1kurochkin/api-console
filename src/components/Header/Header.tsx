import React, {useState} from "react";
import './Header.styles.css'


type PropsTypes = {
    login: string
    subLogin?: string
}

export const Header = React.memo(
    ({login, subLogin}: PropsTypes) => {

        const [fullScreen, setFullScreen] = useState(false)

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                setFullScreen(true)
                return
            }
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setFullScreen(false)
            }
        }

        return (
            <div className="header">

                <div className="header__logo-wrapper">
                    <img className='header__logo-wrapper_img' src="/icons/logo.svg"/>
                    <span className="header__logo-wrapper__title">API-консолька</span>
                </div>

                <div className="header__right-block">
                    <div className="header__right-block__user-info">{login} {subLogin ? `:  ${subLogin}` : ''}</div>
                    <div className="header__right-block__exit-button">
                        <span>Выйти</span>
                        <img className="header__right-block__exitButton_img" src="/icons/log-out.svg"/>
                    </div>

                    <img
                        className="header__right-block__full-screen-button"
                        src={ fullScreen ? '/icons/full-screen-exit.svg' : '/icons/full-screen.svg' }
                        onClick={toggleFullScreen}
                    />
                </div>
            </div>
        )
    }
)