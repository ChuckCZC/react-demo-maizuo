import * as types from '../types'
const initialState = {
    list:[],
    district:[]
}

export default function cinemaState(state=initialState,action){
    switch(action.type){
        case types.CINEMA_GET_LIST:
            let district = [],_json={};
            for(let item of action.data.cinemas){
                _json = {
                    name:item.district.name,
                    pinyin:item.district.pinyin
                }
                district.push(_json)
            }
            district = district.unique('name').sort(function(a,b){
                return a.pinyin.localeCompare(b.pinyin.charAt(0))
            });
            return Object.assign({},state,{
                list:action.data.cinemas,
                district:district
            })
        default: 
            return state
    }
}