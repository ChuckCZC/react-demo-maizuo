import * as types from '../types'
import api from '../api'
import * as utils from './com'

function getFilmDetail(res){
    return {
        type:types.DETAIL_GET_INFO,
        data:res.data
    }
}

export function fetchFilmDetail(id){
    return (dispatch) => {
        dispatch(utils.loading(true))
        api.getFilmDetail(id,function(res){
            dispatch(getFilmDetail(res))
            dispatch(utils.loading(false))
        })
    }
}
export function changeTitle(title){
    return (dispatch) => {
        dispatch(utils.conf(title))
    }
}