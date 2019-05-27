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
        let {placeholder,searchHandle,extraClass,searchMentionHandle,dataSource,renderOption,isCollapse,disabled} = this.props;
        return (
            <AutoComplete
                size = "large"
                className = {(extraClass ? extraClass : "") + " autoInput" + (this.state.selectInput && isCollapse ? " selected" : "")}
                dataSource = {dataSource.map(renderOption)}
                onSelect = {searchHandle}
                optionLabelProp = "text"
                onBlur = {this.onBlurHandle}
                onFocus = {this.focusHandle}
                disabled = {disabled}
                
            >
                <Input.Search
                    placeholder = {placeholder}
                    onSearch = {searchMentionHandle}
                >
                </Input.Search>
            </AutoComplete>
        )
    }
}

export default AutoCompleteInput;