import React from 'react';
import {Input,AutoComplete,Icon} from 'antd';
import './index.less';

class AutoCompleteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectInput : false
        }
    }
    renderOption = (item) => {
        return (
            <AutoComplete.Option key = {item.type + "," + item.text} text = {item.text}>
                {item.type === "product" ? <Icon type="deployment-unit" style = {{fontSize : "16px" , color : "#e84454"}} /> : null}
                {item.type === "user" ? <Icon type="user" style = {{fontSize : "16px" , color : "#1969a9"}} /> : null}
                {item.type === "team" ? <Icon type="team" style = {{fontSize : "16px" , color : "#45980c"}} /> : null}
                <span className = "autoInput-item">{item.text}</span>
            </AutoComplete.Option>
        )
    };
    focusHandle = () => {
        this.setState({
            selectInput : true
        })
    };
    onBlurHandle = () => {
        this.setState({
            selectInput : false
        })
    };
    render(){
        let {placeholder,searchHandle,extraClass,searchMentionHandle,dataSource} = this.props;
        return (
            <AutoComplete
                onSearch = {searchMentionHandle}
                size = "large"
                className = {(extraClass ? extraClass : "") + " autoInput" + (this.state.selectInput ? " selected" : "")}
                dataSource = {dataSource.map(this.renderOption)}
                onSelect = {searchHandle}
                optionLabelProp = "text"
                onBlur = {this.onBlurHandle}
                onFocus = {this.focusHandle}
            >
                <Input.Search
                    placeholder = {placeholder}
                    onSearch = {searchHandle}
                >
                </Input.Search>
            </AutoComplete>
        )
    }
}

export default AutoCompleteInput;