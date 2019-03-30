//全局注入
import './index.less';
import Header from '../../component/header/index.jsx';
import React from 'react';
import {connect} from 'react-redux'
import SlideMenu from './components/menu/index.jsx';
import { Host } from '../../config/host.jsx';
import Utils from '../../common/utils.jsx';
import Body from './components/body/index.jsx';
import CenterDiv from '../../pureComponent/centerDiv/index';
class Basis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpenKey : ['personSetting'],
            menuSelectedKey : ['examDate']
        }
    }
    componentDidMount(){
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
        return (
            <div style = {{"height" : "100%" , "width" : "100%"}}>
                <Header />
                <div className = "slide-body-ctn">
                    <CenterDiv extraClass = "slide-body-group">
                        <SlideMenu 
                            menuOpenKey = {this.state.menuOpenKey}
                            menuSelectedKey = {this.state.menuSelectedKey}
                            menuClickHandle = {this._menuClickHandle}
                            menuOpenHandle = {this._menuOpenHandle}
                        />
                        <Body />
                    </CenterDiv>
                </div>

            </div> 
        )
    }
}

function select(state) {
    return {
        basis: state.basis
    };
}

export default connect(select)(Basis);
