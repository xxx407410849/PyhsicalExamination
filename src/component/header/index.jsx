import React from 'react';
import {Menu,Icon,Row,Col} from 'antd';
import { Link } from 'react-router-dom';
class Header extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selectedKey : ''
        }
    }
    clickHandle = (e) => {
        this.setState({
            selectedKey : e.key
        })
    }
    render(){
        return [
            <nav className = "header" onClick = {this.clickHandle}>
                <Row>
                    <Col span = {6} pull = {18}>
                        <div className = "h-icon">
                            <i className = "iconfont"></i>
                        </div>
                    </Col>
                    <Col span = {18} push = {6}>
                        <Menu 
                            mode = "horizontal"
                            defaultSelectedKeys = {['phyexmData']}
                            style = {{ lineHeight = "64px" }}
                        >
                            <Menu.item key = "authority">
                                <Link to = "/authority">权限管理</Link>
                            </Menu.item>
                            <Menu.item key = "phyexmData">
                                <Link to = "/phyexmData">体测数据</Link>
                            </Menu.item>
                            <Menu.item key = "dataVisual">
                                <Link to = "/dataVisual">数据分析</Link>
                            </Menu.item>
                        </Menu>   
                    </Col>
                </Row>   
            </nav>
        ]
    }
}

export default Header;
