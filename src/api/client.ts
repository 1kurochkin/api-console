// @ts-ignore
import Sendsay from 'sendsay-api'
export const sendsay = new Sendsay()

export const requestToSendsay = (action: string , payload: object) => {
    console.log('REQUEST TO SENDSAY', action, payload)
    return sendsay.request({
        action, ...payload
    })
}




