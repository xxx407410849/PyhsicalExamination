import React from 'react';
import './index.less';

class LogoBtn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { extraClass, onTap} = this.props;
        let cls ="logo-btn " + extraClass;
        return(
            <div
                className={cls}
                onClick={onTap}
            >
                {this.props.children}
            </div>
        )
    }
}
export default LogoBtn;
