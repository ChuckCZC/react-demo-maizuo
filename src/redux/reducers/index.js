import {combineReducers} from 'redux'
import settingState from './com'
import homeState from './home'
import detailState from './detail'
import filmState from './film'
import cinemaState from './cinema'

export default combineReducers({
	settingState,
	homeState,
	detailState,
	filmState,
	cinemaState
})