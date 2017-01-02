import React,{Component} from 'react'

import {Router,Route,Redirect,IndexRoute,browserHistory,hashHistory} from 'react-router'

import home from './pages/home'
import Roots from './components/root'




/**
 * browserHistory : 类似example.com/some/path
 * hashHistory : 类似example.com/#/some/path
 */

 const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

 /**
 * require.ensure : 在需要的时候才下载依赖模块
 * require.ensure(dependencies:String[],callback:function([require]),[chunkName:String])
 * dependencies: 依赖的模块数组
 * callback: 回调函数，该函数调用时会传一个require参数
 * chunkName: 模块名，用于构建时生成文件时命名使用
 */
const detail  = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('./pages/detail').default)
	},'detail/:id')
}
const film  = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('./pages/film').default)
	},'film/:type')
}
const cinema  = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('./pages/cinema').default)
	},'cinema/:id')
}

/**
 * IndexRoute 默认路由
 * Redirect 当匹配到不符合的路由时，默认跳转到固定的路由
 * 动态路由用getComponent引入
 * 路由跳转时(App不考虑)：
 *      如从home -> discover
 *      home触发componentWillunmount , discover触发componentDidMount
 *      如从home/123 -> home/456
 *      home触发componentWillReceiveProps,componentDidMount
 */
const RouteConfig = (
	<Router history={history}>
		<Route path='/' component={Roots}>
			<IndexRoute component={home} />
			<Route path='home' component={home} />
			<Route path='detail' getComponent={detail} />
			<Route path='film' getComponent={film} />
			<Route path='cinema' getComponent={cinema} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)

export default RouteConfig