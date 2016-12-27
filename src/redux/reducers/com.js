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
			return Object.assign({},state,{
				...state,
				...actions.settings
			});
		case types.COM_LOADING_STATUS:
			return Object.assign({},state,{
				...state,
				loading:action.loading
			});
		case types.CHANGE_LEFTNAV_STATUS:
			return Object.assign({},state,{
				...state,
				leftNavState:action.leftNavState
			});
		default:
			return state
	}
}