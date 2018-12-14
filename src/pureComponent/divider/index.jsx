import React from 'react';
import './index.less';
class Divider extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        let {type,extraClass} = this.props;
        if(!type) type = "justify";
        if(!extraClass) extraClass = "";
        return (
            <div className = {"lance-divider" + extraClass + (" lance-divider-" + type)}></div>
        )
    }
}
export default Divider;
