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
    this.state = {
      type:this.props.location.query.type ? this.props.location.query.type : 'now-playing',
    }
    this.handleScrollMore = this.handleScrollMore.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.nowPlayingList !== nextProps.nowPlayingList || this.props.comingSoonList !== nextProps.comingSoonList || this.state.type !== nextState.type){
      return true;
    }else{
      return false;
    }
  }
  //销毁时解绑事件
  componentWillUnmount(){
      window.removeEventListener('scroll',this.handleScrollMore)
  }
  componentDidMount () {
    let {nowPage,comingPage,nowPlayingList,comingSoonList} = this.props,
          {type} = this.state;
    
    if((nowPage == 0 && type == 'now-playing') || (comingPage == 0 && type == 'coming-soon')){
      document.body.scrollTop = 0;
    }
    if(type == 'now-playing' && nowPlayingList.length == 0){
      this.props.actions.fetchNowPlaying(++nowPage)
    }else if(type == 'coming-soon' && comingSoonList.length == 0){
      this.props.actions.fetchComingSoon(++comingPage)
    }
    window.addEventListener('scroll',this.handleScrollMore)
  }
  handleScrollMore(){
    if(document.body.scrollTop + window.innerHeight >= document.getElementById('container').clientHeight - 200){
      let {nowPage,comingPage,getNowMore,getComingMore} = this.props,
          {type} = this.state ;
      if(type == 'now-playing' && getNowMore){
        this.props.actions.fetchNowPlaying(++nowPage)
      }else if(type == 'coming-soon' && getComingMore){
        this.props.actions.fetchComingSoon(++comingPage)
      }
    }
  }
  renderNowItem(){
    const {nowPlayingList} = this.props;
    let str = [];
    if(nowPlayingList.length == 0) return ;
    for(let item of nowPlayingList){
      str.push(
        <Link to={{pathname:'cinema',query:{id:item.id}}} className="item" key={++_key}>
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
  renderComingItem(){
    const {comingSoonList} = this.props;
    let str = [];
    if(comingSoonList.length == 0) return ;
    for(let item of comingSoonList){
      str.push(
        <Link to={{pathname:'detail',query:{id:item.id}}} className="item" key={++_key}>
          <div className="avater"><img src={item.poster.thumbnail} alt=""/></div>
          <div className="info">
            <h3>{item.name}</h3>
            <p>{item.intro}</p>
            <p><span className="time">{this.formatDate(item.premiereAt)}</span></p>
          </div>
          <div className="count"></div>
        </Link>
      )
    }
    return str ;
  }
  formatDate(time){
    let date = new Date(time*1),
        month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
        day = date.getDate()  > 9 ? date.getDate()  : '0' + date.getDate(),
        week = date.getDay();
      
      let arr = ['日','一','二','三','四','五','六']
      
      return `${month}月${day}日上映 星期${arr[week]}`
  }
  changeTab(type){
    this.setState({
      type:type
    })
    let {nowPage,comingPage,nowPlayingList,comingSoonList} = this.props;
    if(type == 'now-playing' && nowPlayingList.length == 0){
      this.props.actions.fetchNowPlaying(++nowPage)
    }else if(type == 'coming-soon' && comingSoonList.length == 0){
      this.props.actions.fetchComingSoon(++comingPage)
    }
  }
  render(){
    let {type} = this.state,
        nowStr = this.renderNowItem(),
        comingStr = this.renderComingItem();
    return (
      <div id="film">
        <div className="tabs">
          <div onClick={()=>this.changeTab('now-playing')} className={type == 'now-playing' ? 'item active':'item'}>正在热映</div>
          <div onClick={()=>this.changeTab('coming-soon')} className={type == 'coming-soon' ? 'item active':'item'}>即将上映</div>
        </div>
        <div className="tab-content">
          <div className={type=='now-playing'?'now-playing-list active':'now-playing-list'}>{nowStr}</div>
          <div className={type=='coming-soon'?'coming-soon-list active':'coming-soon-list'}>{comingStr}</div>
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
    comingPage: state.filmState.comingPage,
    // pathname:state.settingState.pathname
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Film) ;
