import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators}  from 'redux'
import {Link} from 'react-router'
import * as actions from '../redux/actions/film'
import '../styles/film'

let _key = 0;
class Film extends Component {
  constructor(props){
    super(props)
    this.handleScroll2 = this.handleScroll2.bind(this)
    this.state = {
      type:this.props.location.query.type ? this.props.location.query.type : 'now-playing'
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.nowPlayingList !== nextProps.nowPlayingList){
      return true;
    }else{
      return false;
    }
  }
  componentDidMount () {
    let {nowPage,comingPage,nowPlayingList,comingSoonList} = this.props,
          {type} = this.state;
    
    if(type == 'now-playing' && nowPlayingList.length == 0){
      this.props.actions.fetchNowPlaying(++nowPage)
    }else if(type == 'coming-soon' && comingSoonList.length == 0){
      this.props.actions.fetchComingSoon(++comingPage)
    }
  }
  
  handleScroll2(){
    console.log(222)
      console.log(1,document.body.scrollTop);
  }
  renderNowItem(){
    const {nowPlayingList} = this.props;
    let str = [];
    if(nowPlayingList.length == 0) return ;
    for(let item of nowPlayingList){
      str.push(
        <Link href="" className="item" key={++_key}>
          <div className="avater"><img src={item.poster.thumbnail} alt=""/></div>
          <div className="info">
            <h3>{item.name}</h3>
            <p>{item.intro}</p>
            <p>
              <span>{item.cinemaCount}</span>家影院上映&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{item.watchCount}</span>人购票
            </p>
          </div>
          <div className="count">{item.grade}</div>
        </Link>
      )
    }
    return str ;
  }
  render(){
    let {type} = this.state,
        nowStr = this.renderNowItem();
    return (
      <div id="film" onScroll={this.handleScroll2}>
        <div className="tabs">
          <div className={type == 'now-playing' ? 'item active':'item'}>正在热映</div>
          <div className={type == 'coming-soon' ? 'item active':'item'}>即将上映</div>
        </div>
        <div className="tab-content">
          <div className="now-playing-list">{nowStr}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nowPlayingList: state.filmState.nowPlayingList,
    comingSoonList: state.filmState.comingSoonList,
    getNowMore: state.filmState.getNowMore,
    getComingMore: state.filmState.getComingMore,
    nowPage: state.filmState.nowPage,
    comingPage: state.filmState.comingPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Film) ;
