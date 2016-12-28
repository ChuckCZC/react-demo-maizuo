import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreates}  from 'redux'

class Cinema extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount () {
    console.log(this.props)
  }
  
  render(){
    return (
      <div>Cinema</div>
    )
  }
}

export default Cinema;
