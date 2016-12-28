import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {bindActionCreators}  from 'redux'
import * as actions from '../redux/actions/detail'
import '../styles/detail'

let _key = 0;

class Detail extends Component {
  constructor(props){
    super(props)
  }
  shouldComponentUpdate (nextProps, nextState) {
    if(this.props.detail !== nextProps.detail){
      return true;
    }else{
      return false;
    }
  }
  
  componentDidMount () {
    let _id = this.props.location.query.id;
    this.props.actions.fetchFilmDetail(_id)
  }

  formatDate(time){
    let date = new Date(time*1),
        year = date.getFullYear(),
        month = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0' + (date.getMonth() + 1),
        day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

    return year + '-' + month + '-' + day;
  }
  
  render(){
    const {detail} = this.props
    console.log(detail)
    if(!detail){
      return (
        <div id="detail">
        <p className="no-tip">正在查询该影片详情</p>
        </div>
      )
    }
    let _name = [];
    for(let item of detail.actors){
      _name.push(
        <span key={++_key}>{item.name}</span>
      )
    }
    return (
      <div id="detail">
        <div className="cover"><img src={detail.cover.origin} /></div>
        <div className="desc">
          <div className="title">影片简介</div>
          <div className="info">
            <p>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：{detail.director}</p>
            <p>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：{_name}</p>
            <p>地区语言：{detail.nation}({detail.language})</p>
            <p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：{detail.category}</p>
            <p>上映日期：{this.formatDate(detail.premiereAt)}</p>
            <p className="p">{detail.synopsis}</p>
          </div>
        </div>
        <Link className="go-pay" style={{display:detail.isNowPlaying?'block':'none'}} to={{pathname:'cinema',query:{id:detail.id}}} >立即购票</Link>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    detail: state.detailState.detail
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail);
