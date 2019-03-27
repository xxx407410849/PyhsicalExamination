import React from 'react';
import { connect } from 'react-redux';
import fetch from '../common/fetch.jsx';
import { Host } from '../config/host.jsx';
import { authorCheck } from './action/index.js';
class Global extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        this.props.dispatch(authorCheck());
    }
    render(){
        return null;
    }
}
function select(state) {
    return {
        login: state.login
    };
}

export default connect(select)(Global);