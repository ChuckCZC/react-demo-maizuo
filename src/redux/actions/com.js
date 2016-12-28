import * as types from '../types'

export function loading(status){
    return {
        type:types.COM_LOADING_STATUS,
        loading:status
    }
}