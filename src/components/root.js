import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as actions from '../redux/actions/com'

import Header from './header'
import Loading from './loading'
import GoTop from './go-top'

class Roots extends Component {
	/**
	 * ReactCSSTransitionGroup内部的container需要个key
	 * 因为ReactCSSTransitionGroup在过渡期间同时维护新老组件需要一个唯一标识加以区分
	 * 而location.pathname代表当前访问的完整路径，合适不过
	 */
	constructor(props){
		super(props)
		this.handleScrollGoTop = this.handleScrollGoTop.bind(this)
		this.state = {
			showTop:false,
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.location.pathname !== nextProps.location.pathname){
            // this.props.actions.pathname(nextProps.location.pathname) //属性暂时没用到
			return true ;
        }else if(this.state.showTop != nextState.showTop){
            return true ;
        }else{
			return false;
		}
	}
	//全页面监听滚动是否显示返回顶部按钮
	componentDidMount() {
		window.addEventListener('scroll',this.handleScrollGoTop)
	}
	handleScrollGoTop(){
		if(document.body.scrollTop > 200){
			this.setState({
				showTop:true
			})
		}else{
			this.setState({
				showTop:false
			})
		}
	}
	
	render(){
		return (
			<div>
				<Header />
				<Loading />
				<ReactCSSTransitionGroup  transitionName="page" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					<div id="container" className="container" key={this.props.location.pathname}>
						{this.props.children}
					</div>
				</ReactCSSTransitionGroup>
				<GoTop showTop={this.state.showTop} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Roots)
