import React from 'react';
import { connect } from 'react-redux';
import fetch from '../common/fetch.jsx';
import { Host } from '../config/host.jsx';
import { authorCheck } from './action/index.jsx';
import './index.less';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        console.log(111);
        this.props.dispatch(authorCheck());
    }
    componentWillReceiveProps(){
    }
    render(){
        return null;
    }
}
function select(state) {
    return {
        home: state.home,
        login: state.login
    };
}

export default connect(select)(Home);