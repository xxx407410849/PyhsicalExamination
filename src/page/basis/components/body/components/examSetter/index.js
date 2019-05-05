import React from 'react';
import './index.less';
import ExamSetForm from './components/examSetForm/index';
import { Icon, Popover } from 'antd';
import { examGet } from './actions/index';
import { connect } from 'react-redux';
import ExamSetTable from './components/examSetTable/index';
class ExamSetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.dispatch(examGet());
    }
    render() {
        const ruleContent = (
            <div>
                <p>默认根据考核批次生成四个班级</p>
                <p>分别是35岁以下男初复训班、35岁以下女初复训班、35岁以上男初复训班、35岁以上女初复训班</p>
                <p>生成编号为"EC(表示exam-class)"+年份+批次+"U/D(分别表示up和down，35岁以上和以下)"</p>
                <p>+"F/M(分别表示female和male,女和男)"</p>
                <p style = {{color : "red"}}>如果除编号、名称任意值确认，该批次将无法删除，请注意</p>
            </div>
        );
        const ruleTitle = (
            <span>生成规则详情</span>
        );
        return (
            <div className="body-es-ctn">
                <div className="body-es-setbar">
                    <div className="leftinfo">
                        <p>请在右侧输入框输入需要生成的考核批次</p>
                        <p>请谨慎设置考核批次，此设置将影响大量基本功能</p>
                    </div>
                    <div className="inputbar">
                        <ExamSetForm />
                    </div>
                    <Popover content = {ruleContent} title = {ruleTitle} placement = "bottom">
                        <div className="rightinfo">
                            <p>考核班级生成规则</p>
                            <Icon type="question-circle" style={{ color: "#0088A8", fontSize: "22px" }} />
                        </div>
                    </Popover>
                </div>
                <div className = "body-es-tablebar">
                    <ExamSetTable />
                </div>
            </div>
        )
    }
}
function select(state){
    return {
        basis: state.basis,
        examset: state.examset
    }
}
export default connect(select)(ExamSetter);