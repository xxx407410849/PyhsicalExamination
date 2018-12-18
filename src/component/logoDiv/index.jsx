import React from 'react';
import './index.less';
import LogoBtn from './components/logoBtn/index.jsx';
import { Icon } from 'antd';
import { Host } from '../../config/host.jsx';

class LogoDiv extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {}
    }
    gitBtnClickHandle = () => {
        location.href = Host.github;
    };
    blogBtnClickHandle = () => {
        location.href = Host.blog;
    };
    render(){
        return (
            <div className = "logo-ctn">
                <p className = "logo-text">lANcElOT</p>
                <div className = "logo-btnbar">
                    <LogoBtn extraClass = "btn-github" onTap = {this.gitBtnClickHandle}>
                        <span><Icon type="github" /><span>github</span></span>
                    </LogoBtn>
                    <LogoBtn extraClass = "btn-blog" onTap = {this.blogBtnClickHandle}>
                        <span><Icon type="chrome" />lanceBlog</span>
                    </LogoBtn>
                </div>
            </div>
        )
    }
}
export default LogoDiv;