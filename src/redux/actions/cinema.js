import * as types from '../types'
import api from '../api'
import * as utils from './com'

function getCinemaList(res){
    return {
        type:types.CINEMA_GET_LIST,
        data:res.data
    }
}
export function fetchCinemaList(id){
    return (dispatch) => {
        dispatch(utils.loading(true))
        api.getCinemaList(id,function(res){
            dispatch(getCinemaList(res))
            dispatch(utils.loading(false))
        })
    }
}