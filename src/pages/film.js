import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators}  from 'redux'
import {Link} from 'react-router'
import * as actions from '../redux/actions/film'

class Film extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>Film</div>
    )
  }
}

export default Film;
