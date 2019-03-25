import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import LoginForm from './component/loginBody/index';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    _loginHandle = () => {
        console.log("111");
    };
    render(){
        let {loginHandle} = this.props;
        return (
            <LoginForm 
                loginHandle = {this._loginHandle}
            />
        )
    }
}

function select(state) {
    return {
        home: state.home,
        login: state.login
    };
}

export default connect(select)(Login);