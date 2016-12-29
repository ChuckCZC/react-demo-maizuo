import * as types from '../types'

const initialState = {
    nowPlayingList:[],
    comingSoonList:[],
    getNowMore:true,
    getComingMore:true
}

export default function filmState(state=initialState,action){
    switch(action.type){
        case types.FILM_GET_NOWPLAYING:
            return Object.assign({},state,{
                ...state,
                getNowMore:action.data.page.current < action.data.page.total ? true : false,
                nowPlayingList:state.nowPlayingList.concat(action.data.films)
            })
        case tyeps.CHANGE_NOWPLAYING_MORE:
            return Object.assign({},state,{
                ...state,
                getNowMore:false,
            })
        case types.CHANGE_COMING_MORE:
            return Object.assign({},state,{
                ...state,
                getComingMore:false,
            })
        case types.FILM_GET_COMINGSOON:
            return Object.assign({},state,{
                ...state,
                getComingMore:action.data.page.current < action.data.page.total ? true : false,
                comingSoonList:state.comingSoonList.concat(action.data.films)
            })
    }
}