import * as types from '../types'

const initialState = {
    nowPlayingList:[],
    comingSoonList:[],
    nowPage:0,
    comingPage:0,
    getNowMore:true,
    getComingMore:true
}

export default function filmState(state=initialState,action){
    switch(action.type){
        case types.FILM_GET_NOWPLAYING:
            return Object.assign({},state,{
                ...state,
                nowPage:action.data.page.current,
                getNowMore:action.data.page.current < action.data.page.total ? true : false,
                nowPlayingList:state.nowPlayingList.concat(action.data.films)
            })
        // case types.FILE_NOWPLAYING_NUM:
        //     return Object.assign({},state,{
        //         ...state,
        //         nowPage:state.nowPage+1,
        //         getNowMore:false,
        //     })
        // case types.FILM_COMINGSOON_NUM:
        //     return Object.assign({},state,{
        //         ...state,
        //         comingPage:state.comingPage+1,
        //         getComingMore:false,
        //     })
        case types.FILM_GET_COMINGSOON:
            return Object.assign({},state,{
                ...state,
                nowPage:action.data.page.current,
                getComingMore:action.data.page.current < action.data.page.total ? true : false,
                comingSoonList:state.comingSoonList.concat(action.data.films)
            })
        default:
            return state ;
    }
}