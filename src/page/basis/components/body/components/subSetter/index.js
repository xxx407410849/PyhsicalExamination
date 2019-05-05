import React from 'react';
import { connect } from 'react-redux';
import "./index.less";
import SubSetForm from './components/subSetForm/index';
class SubSetter extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className = "body-sub-ctn">
                <SubSetForm />
            </div>
        )
    }
}
function select(state){
    return {
        subset : state.subset
    }
}
export default connect(select)(SubSetter);
