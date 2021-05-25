import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from "react-hook-form";
import {FORM} from "../../constants";
import Input from "../../components/Input/Input";
import './LoginPage.styles.css'
import {Button} from "../../components/Button/Button";

const {LOGIN, SUB_LOGIN, PASSWORD} = FORM

export const LoginPage = ({history}: any) => {

    /////////////////////////
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const watchAllFields = watch();


    console.log(watchAllFields)
    console.log(errors)

    // const dispatch = useDispatch();
    // const [login, setLogin] = useState('');
    // const [sublogin, setSubLogin] = useState('');
    // const [password, setPassword] = useState('');
    // const loading = useSelector((state: any) => state.auth.loading);
    // const isLoggedIn = useSelector((state: any) => !!state.auth.sessionKey?.length);
    // console.log('loading', loading);


    // useEffect(() => {
    //     if (isLoggedIn) {
    //         history.push('/console');
    //     }
    // }, [isLoggedIn]);

    // const doLogin = () => {
    //     dispatch(
    //         authenticate({
    //             login,
    //             sublogin,
    //             password,
    //         })
    //     );
    // };

    const onSubmit = ({ login, sublogin, password }: any) => {

    }


    return (
        <div className='login-page'>
            <img className='login-page__logo' src="/icons/logo.svg"/>
            <div className="login-page__content">

                <div className="login-page__content__head">
                    <span className="login-page__content__head__title">API-консолька</span>
                </div>

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
                        error={errors[PASSWORD.name]}
                        label='Пароль'
                        {...register(PASSWORD.name, PASSWORD.options)}
                    />
                </div>

                <div className="login-page__content__footer">
                    <Button text='Войти' onClick={handleSubmit(onSubmit)} loading={false} disabled={!!Object.keys(errors).length}/>
                </div>

            </div>
        </div>
    );
}



{/*<Form onSubmit={onSubmit} action="/">*/
}
{/*  <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />*/
}
{/*  <input value={sublogin} onChange={(e) => setSubLogin(e.target.value)} placeholder="Сублогин" />*/
}
{/*  <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />*/
}
{/*  <button type="submit" onClick={onSubmit}>*/
}
{/*    Отправить*/
}
{/*  </button>*/
}
{/*</Form>*/
}