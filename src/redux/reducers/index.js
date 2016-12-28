import {combineReducers} from 'redux'
import settingState from './com'
import homeState from './home'

export default combineReducers({
	settingState,
	homeState
})