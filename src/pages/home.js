import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators}  from 'redux'
import {Link} from 'react-router'
import ReactSwipe from 'react-swipe'
import * as actions from '../redux/actions/home'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import '../styles/home'

let _key = 0;

class Home extends Component {
  constructor(props,context){
    super(props,context);
  }
  shouldComponentUpdate (nextProps, nextState) {
    if((this.props.banner !== nextProps) || (this.props.props.nowplay !== nextProps.nowplay) || (this.props.coming !== nextProps.coming)){
      return true;
    }else{
      return false;
    }
  }
  componentDidMount() {
    console.log(this.props)
    this.props.actions.fetchBanner(() => {
      this.props.actions.fetchNowPlaying();
      this.props.actions.fetchComingSoon();
    });
    
  }
  renderBanner(){
    const {banner} = this.props;
    if(banner.length == 0){
      return ;
    }
    let str = [];
    for(let item of banner){
      str.push(
        <div className="slide" key={++_key}>
          <a target="_blank" href={item.url}><img src={item.imageUrl} alt=""/></a>
        </div>
      )
    }
    return str ;
  }
  renderNowplay(){
    const {nowplay} = this.props
    if(nowplay.length == 0){
      return ;
    }
    let str = []
    for(let item of nowplay){
      str.push(
        <div className="item" key={++_key}>
          <Link to={{pathname:'detail',query:{id:item.id}}}>
            <img src={item.cover.origin} alt=""/>
            <div className="desc">
              <div className="info">
                <h4>{item.name}</h4>
                <p>{item.cinemaCount}家影院上映 {item.watchCount}人购票</p>
              </div>
              <div className="count">{item.grade}</div>
            </div>
          </Link>
        </div>
      )
    }
    return (
      <div className="now-playing">
          {str}
        <Link to={{pathname:'film',query:{type:'now-playing'}}} className="go-more">更多热映电影</Link>
      </div>
    );
  }
  formatDate(time){
    let date = new Date(time*1),
        month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
        day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      
    return `${month}月${day}日上映`
  }
  renderComing(){
    const {coming} = this.props
    if(coming.length == 0){
      return ;
    }
    let str = []
    for(let item of coming){
      str.push(
        <div className="item" key={++_key}>
          <Link to={{pathname:'detail',query:{id:item.id}}}>
            <img src={item.cover.origin} alt=""/>
            <div className="desc">
              <div className="info">
                <h4>{item.name}</h4>
              </div>
              <div className="time">{this.formatDate(item.premiereAt)}</div>
            </div>
          </Link>
        </div>
      )
    }
    return (
      <div className="coming-soon">
        {str}
        <Link to={{pathname:'film',query:{type:'coming-soon'}}} className="go-more">更多即将上映电影</Link>
      </div>
    );
  }
  render(){
    let bannerStr = this.renderBanner(),
        nowplayStr = this.renderNowplay(),
        comingStr = this.renderComing();
    return (
      <div id="home">
        <div className="banner">
            <ReactSwipe className="banner-swiper" swipeOptions={{autoplay:3000,autoHeight:true}} >
            {bannerStr}
            </ReactSwipe>
        </div>
        {nowplayStr}
        {comingStr}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    banner:state.homeState.banner,
    nowplay:state.homeState.nowplay,
    coming:state.homeState.coming
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
