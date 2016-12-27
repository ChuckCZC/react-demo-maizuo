import * as types from '../types'

const initialState = {
	// isBack:false,
	title:'title',
	loading:0,
	leftNavState:false
}

export default function settingState(state=initialState,action){
	switch(action.type){
		case types.COM_CONF:
		case types.COM_LOADING_STATUS:
		case types.CHANGE_LEFTNAV_STATUS:
		default:
			return state
	}
}