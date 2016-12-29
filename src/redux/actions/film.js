import * as types from '../types'
import api from '../api'
import * as utils from './com'

function getNowMore(){
    return {
        type:types.CHANGE_NOWPLAYING_MORE
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
        // dispatch(numNowPlaying())
        api.getNowPlayList(page,function(res){
            dispatch(getNowPlaying(res))
        })
    }
}

function getComingMore(){
    return {
        type:types.CHANGE_COMING_MORE
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
        api.getComingList(page,function(res){
            dispatch(getComingSoon(res))
        })
    }
}


 