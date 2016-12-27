import React,{Component,PropTypes} from 'react'
import '../styles/header'

class Header extends Component {
    static defaultProps = {
        title:'卖座电影'
    }
    static propTypes = {
        title:React.PropTypes.string
    }
    constructor(props){
        super(props)
    }
    componentDidMount () {
        console.log(this.props)
    }
    render(){
        const {title} = this.props
        return (
            <div id="header">
                <a className="go-menu"><i className="icon iconfont icon-menu"></i></a>
                <div className="title">
                    <p>{title}</p>
                    <a className="go-city">广州<i className="icon iconfont icon-bottom"></i></a>
                    <a className="go-mine"><i className="icon iconfont icon-people"></i></a>
                </div>
            </div>
        )
    }
    
}

export default Header ;