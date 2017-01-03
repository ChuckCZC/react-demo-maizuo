import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators}  from 'redux'
import * as actions from '../redux/actions/cinema'
import '../styles/cinema'

let _key = 0;

class Cinema extends Component {
  constructor(props){
    super(props)
    this.state = {
      area:{
        pinyin:''
      }
    }
    this.renderAreaItem = this.renderAreaItem.bind(this)
    this.changeArea = this.changeArea.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.list != nextProps.list || this.state.area != nextState.area){
      return true
    }else{
      return false
    }
  }
  
  componentDidMount () {
    let _id = this.props.location.query.id;
    this.props.actions.fetchCinemaList(_id)
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.setState({
      area:nextProps.topArea
    })
  }
  
  renderCinemaItem(pinyin){
    const {list} = this.props
    const _id = this.props.location.query.id;
    let str = [];
    for(let item of list){
      if(item.district.pinyin == pinyin){
        let tipStr = [];
        for(let tip of item.labels){
          tipStr.push(
            <span className={tip.type.toLocaleLowerCase()} key={++_key}>{tip.name}</span>
          )
        }
        str.push(
          <div className="shop" key={++_key}>
            <a href={'http://m.maizuo.com/v4/?co=maizuo#!/film/' + _id + '/cinema'}>
              <div className="desc">
                <div className="title">{item.name} <span>座</span>{(item.itemTypes.length>3)&&<span>通</span>}</div>
                <div className="tip">
                {tipStr}
                </div>
                <div className="area">{item.address}</div>
                <div className="extra">距离未知 | 剩余{item.avaliableSchedule}场</div>
              </div>
              <div className="price">￥{item.minimumPrice}</div>
            </a>
          </div>
        )
      }
        
    }
    return str;
  }
  changeArea(area){
    if(this.state.area.pinyin == area.pinyin){
      area = {}
    }
    this.setState({
      area:area
    })
  }
  renderAreaItem(){
    const {district} = this.props
    const {area} = this.state
    let self = this ;
    
    if(district.length == 0){
      return ;
    }
    let str = [];
    for(let item of district){
      str.push(
        <div className="item" key={++_key}>
          <div onClick={()=>this.changeArea(item)} className="title">{item.name}</div>
          <div className={area.pinyin==item.pinyin ? 'list active':'list'}>{this.renderCinemaItem(item.pinyin)}</div>
        </div>
      )
    }
    return str;
  }

  
  render(){
    let cinemaStr = this.renderAreaItem();
    const {district} = this.props;
    return (
      <div id="cinema">
      {cinemaStr}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list:state.cinemaState.list,
    district:state.cinemaState.district,
    topArea:state.cinemaState.district[0]
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cinema);
