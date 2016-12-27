import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'

class Loading extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="loading-rotate">
                <div className="inner">
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.settingState.loading
    }
}
export default connect(mapStateToProps)(Loading)