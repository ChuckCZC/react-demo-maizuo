import * as types from '../types'

const initialState = {
    detail:null
}

export default function detailState(state=initialState,action){
    switch(action.type){
        case types.DETAIL_GET_INFO:
            return Object.assign({},state,{
                ...state,
                detail:action.data.film
            })
        default:
            return state
    }
}