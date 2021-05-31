import React from 'react';
import {useForm} from "react-hook-form";
import {FORM, REQUESTS} from "../../constants";
import Input from "../../components/Input/Input";
import './LoginPage.styles.css'
import {Button} from "../../components/Button/Button";
// import {loginThunk} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../store";
import {postLogin} from "../../redux/fetchState/reducer";

const {LOGIN, SUB_LOGIN, PASSWORD} = FORM

const LoginPage = () => {
    const loading = useSelector((state:storeType) => state.fetchState[REQUESTS.POST_LOGIN].loading )
    const error = useSelector((state:storeType) => state.fetchState[REQUESTS.POST_LOGIN].error )
    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (loginFormData: object) => {
        //login:"karinalol854@gmail.com", passwd: "jo2Fadaqu"
        // @ts-ignore
        dispatch(postLogin(loginFormData))
    }

    return (
        <div className='login-page'>
                <img className='login-page__logo' src="/icons/logo.svg"/>
            <div className="login-page__content">

                <div className="login-page__content__head">
                    <span className="login-page__content__head__title">API-консолька</span>
                </div>
                {error && <div className='login-page__error'>
                    <div className='login-page__error__header'>
                        <img src="/icons/error-smile.svg"/>
                        <span>Вход не вышел</span>
                    </div>
                    <div className='login-page__error__description'>{error}</div>
                </div>}
                <div className="login-page__content__body">
                    <Input
                        error={errors[LOGIN.name]}
                        label='Логин'
                        {...register(LOGIN.name, LOGIN.options)}
                    />
                    <Input
                        error={errors[SUB_LOGIN.name]}
                        label='Сублогин'
                        optional={true}
                        {...register(SUB_LOGIN.name, SUB_LOGIN.options)}
                    />
                    <Input
                        type={'password'}
                        error={errors[PASSWORD.name]}
                        label='Пароль'
                        {...register(PASSWORD.name, PASSWORD.options)}
                    />
                </div>

                <div className="login-page__content__footer">
                    <Button text='Войти' onClick={handleSubmit(onSubmit)} loading={loading} disabled={!!Object.keys(errors).length}/>
                </div>

            </div>
        </div>
    );
}

export default LoginPage
