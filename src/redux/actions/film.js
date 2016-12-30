import * as types from '../types'
import api from '../api'
import * as utils from './com'

// export function getNowMore(){
//     return {
//         type:types.FILE_NOWPLAYING_NUM
//     }
// }
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

// export function getComingMore(){
//     return {
//         type:types.FILM_COMINGSOON_NUM
//     }
// }
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


 