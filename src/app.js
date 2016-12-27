import React,{Component} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import router from './routers'
import store from './redux'

import './styles/reset.sass'

render(
	<Provider store={store}>
		{router}
	</Provider>,
	document.getElementById('app')
)