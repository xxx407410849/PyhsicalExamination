//全局注入
import './index.less';
import Header from '../component/header/index.jsx';
import React from 'react';
import {connect} from 'react-redux'
import SlideMenu from '../component/menu/index.jsx';
import ajax from '../common/fetch.jsx';
import { Host } from '../config/host.jsx';
import Utils from '../common/utils.jsx';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpenKey : ['Insert'],
            menuSelectedKey : ['查询数据']
        }
    }
    componentDidMount(){
        Utils.authorCheck("lancelot",12345678);
    }
    componentWillUnmount(){

    }

    //----sliderMenu----
    _menuClickHandle = (e) => {
        this.changeSelected([e.key]);
    };
    _menuOpenHandle = (key) => {
        this.changeOpen(key);
    }

    changeOpen = (array) => {
        this.setState({
            menuOpenKey : array
        })
    }
    changeSelected = (array) => {
        this.setState({
            menuSelectedKey : array
        })
    }
    //----sliderMenu End----
    
    render(){
        console.log(this.props);
        return (
            <div>
                <Header />
                <SlideMenu 
                    menuOpenKey = {this.state.menuOpenKey}
                    menuSelectedKey = {this.state.menuSelectedKey}
                    menuClickHandle = {this._menuClickHandle}
                    menuOpenHandle = {this._menuOpenHandle}
                />
            </div> 
        )
    }
}

function select(state) {
    return {
        home: state.home
    };
}

export default connect(select)(Home);
