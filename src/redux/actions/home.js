import * as types from '../types'
import api from '../api'
import * as utils from './com'

function getBannerList(res){
    return {
        type:types.HOME_GET_BANNER_LIST,
        data:res.data
    }
}
export function fetchBanner(cb){
    return (dispatch) => {
        dispatch(utils.loading(true))
        api.getBannerList(function(res){
            dispatch(getBannerList(res))
            dispatch(utils.loading(false))
            cb()
        })
    }
}

function getNowPlaying(res){
    return {
        type:types.HOME_GET_NOWPLAYING_LIST,
        data:res.data
    }
}
export function fetchNowPlaying(){
    return (dispatch) => {
        dispatch(utils.loading(true))
        api.getNowPlaying(function(res){
            dispatch(getNowPlaying(res))
            dispatch(utils.loading(false))
        })
    }
}

function getComingSoon(res){
    return {
        type:types.HOME_GET_COMINGSOON_LIST,
        data:res.data
    }
}
export function fetchComingSoon(){
    return (dispatch) => {
        dispatch(utils.loading(true))
        api.getComingSoon(function(res){
            dispatch(getComingSoon(res))
            dispatch(utils.loading(false))
        })
    }
}

