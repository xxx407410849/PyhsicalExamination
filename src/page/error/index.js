import './index.less';
import React, { Component } from 'react';
class ErrorPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        console.log(this.props);
        return (
            <div className = "errorTips">
                您没有进入该页面的权限
            </div>
        )
    }
}
export default ErrorPage;