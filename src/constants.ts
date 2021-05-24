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
        name: 'password',
        options: {
            validate: (value: string) => {
                return !!value && !/[а-яА-Яё]/.test(value)
            },
        }
    },


}