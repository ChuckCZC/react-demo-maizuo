import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class GoTop extends Component {
    constructor(props){
        super(props)
    }
    goTop(){
        let speed = 10;
        let timer = setInterval(function(){
            if(document.body.scrollTop > 0){
                document.body.scrollTop = document.body.scrollTop - speed > 0 ? document.body.scrollTop - speed : 0
                speed += 20 ;
            }else{
                clearInterval(timer)
            }
        },16)
    }
    render(){
        let {showTop} = this.props;
        return (
            <div className={showTop ? 'active go-top' : 'go-top'} onClick={this.goTop}>
                <i className="icon iconfont icon-top-copy"></i>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {

// }
export default GoTop ;