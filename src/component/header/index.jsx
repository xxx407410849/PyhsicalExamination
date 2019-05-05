import React from 'react';
import { Menu, Row, Col, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import Divider from '../../pureComponent/divider/index.jsx';
import AutoCompleteInput from '../../pureComponent/autoCompleteInput/index.jsx';
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react';
import { velocity } from '../../config/velocityAnimateMap.jsx';
import { connect } from 'react-redux';
import fetch from '../../common/fetch.jsx';
import { Host } from '../../config/host.jsx';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: '',
            mentionData: []
        }
    }
    _searchMentionHandle = (value) => {
        //函数防抖
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            console.log("mention", value);
            this.setState({
                mentionData: [{ type: 'product', text: '体测数据分析' }, { type: 'user', text: '李陈' }, { type: 'team', text: '三年一班' }]
            })
        }, 300);
    };
    _searchHandle = (value, option) => {
        console.log("search", value, option);
    };
    loginoutHandle = () => {
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.loginout,
            method : "GET"
        };
        fetch(options).then((data)=>{
            if(data.ret){
                message.success("已退出登录");
                location.pathname = "/";
            }else{
                message.error("未退出登录");
            }
        })
        .catch((err)=>{
            console.log(err);
            message.error("网络连接失败,退出账号失败");
        })
    };
    render() {
        let {home , login} = this.props;
        let userName = home.userName || login.loginUser;
        let userType = home.type || login.userType;
        return (
            <nav className="header">
                <Row
                    type="flex"
                    justify="start"
                    align="bottom"
                    className="h-row"
                    style = {{"height" : "100%"}}
                >
                        <div className="h-bg run-bg">
                        </div>
                        <div className="h-searchctn">
                            <AutoCompleteInput
                                placeholder="全站搜索"
                                searchHandle={this._searchHandle}
                                searchMentionHandle={this._searchMentionHandle}
                                dataSource={this.state.mentionData}
                                extraClass="h-autoInput"
                            />
                        </div>
                        <div className = "h-rightctn">
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={[location.pathname.replace("/","")]}
                                style={{ lineHeight: "64px" , "justifySelf" : "end"}}
                                id="menu-right"
                            >
                                <Menu.Item key="score" style = {{display : (userType === "admin" || userType === "teacher") ? "inline-block" : "none"}}>
                                    <Link to="/score">成绩录入</Link>
                                </Menu.Item>
                                <Menu.Item key="basis" style = {{display : (userType === "admin") ? "inline-block" : "none"}}>
                                    <Link to="/basis">基础数据设置</Link>
                                </Menu.Item>
                                <Menu.Item key="dataVisual">
                                    <Link to="/dataVisual">成绩分析及查询</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/explain">作品介绍</Link>
                                </Menu.Item>
                            </Menu>

                            <VelocityTransitionGroup
                                enter={{ animation: velocity.flipBounceXIn, duration: 1000 }}
                                runOnMount={true}
                            >
                                <div className="h-welcome">
                                    <span>欢迎你</span>
                                    <span className="name">{userName}</span>
                                </div>
                            </VelocityTransitionGroup>
                            <div className = "h-loginout" onClick = {this.loginoutHandle}>
                                <span>注销</span>
                            </div>
                        </div>
                </Row>
            </nav>
        )
    }
}
function select(state) {
    return {
        login: state.login,
        home: state.home
    };
}
export default connect(select)(Header);
