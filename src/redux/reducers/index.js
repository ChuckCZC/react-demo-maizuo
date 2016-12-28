import {combineReducers} from 'redux'
import settingState from './com'
import homeState from './home'
import detailState from './detail'

export default combineReducers({
	settingState,
	homeState,
	detailState
})