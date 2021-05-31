export const ROUTES = {
    LOGIN:"/login",
    MAIN:"/main",
}
export const LOCAL_STORAGE = {
    REQUEST_HISTORY:"REQUEST_HISTORY"
}
export const COOKIE_NAMES = {
    SENDSAY_SESSION:"sendsay_session"
}
export const REQUESTS = {
    POST_LOGIN:"login",
    POST_CONSOLE:"POST_CONSOLE",
    POST_LOGOUT:"POST_LOGOUT",
    GET_USER_DATA:"GET_USER_DATA",
}


export const FORM = {
    LOGIN: {
        name: 'login',
        options: {
            validate: (value: string) => {
                return !!value && /\w/.test(value) && !/[а-яА-Яё]/.test(value)
            },
        }
    },
    SUB_LOGIN: {
        name: 'sublogin',
        options: {
            validate: (value: string) => true
        }
    },
    PASSWORD: {
        name: 'passwd',
        options: {
            validate: (value: string) => {
                return !!value && !/[а-яА-Яё]/.test(value)
            },
        }
    },
    TEXT_AREA_INPUT: {
        name: 'input',
        options: {
            validate: (value: string) => {
                return !!value && !/[а-яА-Яё]/.test(value)
            },
        }
    },
    TEXT_AREA_OUTPUT: {
        name: 'output',
        options: {
            validate: (value: string) => {
                return !!value && !/[а-яА-Яё]/.test(value)
            },
        }
    },


}