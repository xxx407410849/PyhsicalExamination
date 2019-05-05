import React from 'react';
import './index.less';
class CenterDiv extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        let {vertical,extraClass} = this.props;
        let cls = "lancelot-div " + 
        (extraClass ? extraClass : "") +
        (vertical ? " lancelot-div-vertical" : "");
        return (
            <div className = {cls}>
                {this.props.children}
            </div>
        )
    }
}

export default CenterDiv;