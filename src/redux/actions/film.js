import * as types from '../types'
import api from '../api'
import * as utils from './com'

function getNowMore(status=false){
    return {
        type:types.CHANGE_NOWPLAYING_MORE,
        data:status
    }
}
function getNowPlaying(res){
    return {
        type:types.FILM_GET_NOWPLAYING,
        data:res.data
    }
}

export function fetchNowPlaying(page){
    return (dispatch) => {
        dispatch(getNowMore()) //防止同一动作多次执行
        api.getNowPlayList(page,function(res){
            dispatch(getNowPlaying(res))
        })
    }
}

function getComingMore(status=false){
    return {
        type:types.CHANGE_COMING_MORE,
        data:status
    }
}
function getComingSoon(res){
    return {
        type:types.FILM_GET_COMINGSOON,
        data:res.data
    }
}
export function fetchComingSoon(page){
    return (dispatch) => {
        dispatch(getComingMore())
        api.getComingList(page,function(res){
            dispatch(getComingSoon(res))
        })
    }
}


 