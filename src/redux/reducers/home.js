import * as types from '../types'

const initialState = {
    banner:[],
    nowplay:[],
    coming:[]
}

export default function homeState(state=initialState,action){
    switch(action.type){
        case types.HOME_GET_BANNER_LIST:
            return Object.assign({},state,{
                banner:action.data.billboards
            })
        case types.HOME_GET_NOWPLAYING_LIST:
            return Object.assign({},state,{
                nowplay:action.data.films
            })
        case types.HOME_GET_COMINGSOON_LIST:
            return Object.assign({},state,{
                coming:action.data.films
            })
        default:
         return state;
    }
}