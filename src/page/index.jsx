//全局注入
import './index.less';
import Header from '../component/header/index.jsx';
import React from 'react';
import {connect} from 'react-redux'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    render(){
        console.log(this.props);
        return (
            <div>
                <Header />
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
