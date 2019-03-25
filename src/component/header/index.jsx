import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import Divider from '../../pureComponent/divider/index.jsx';
import AutoCompleteInput from '../../pureComponent/autoCompleteInput/index.jsx';
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react';
import { velocity } from '../../config/velocityAnimateMap.jsx';
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

    render() {
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
                                defaultSelectedKeys={['phyexmData']}
                                style={{ lineHeight: "64px" , "justifySelf" : "end"}}
                                id="menu-right"
                            >
                                <Menu.Item key="authority">
                                    <Link to="/authority">权限管理</Link>
                                </Menu.Item>
                                <Menu.Item key="phyexmData">
                                    <Link to="/phyexmData">数据处理</Link>
                                </Menu.Item>
                                <Menu.Item key="dataVisual">
                                    <Link to="/dataVisual">数据分析</Link>
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
                                    <span className="name">{this.props.authorName}李陈</span>
                                </div>
                            </VelocityTransitionGroup>
                        </div>
                </Row>
            </nav>
        )
    }
}

export default Header;
