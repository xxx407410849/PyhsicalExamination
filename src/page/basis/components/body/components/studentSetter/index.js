import React from 'react';
import './index.less';
import { Icon, Popover, Select } from 'antd';
import { connect } from 'react-redux';
import { getRound, getStu } from './actions';
import StuSetTable from './components/studentTable/index';
class StudentSetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roundSelect: "" //默认未选中是哪个批次
        }
    }
    componentDidMount() {
        this.props.dispatch(getRound());
    }
    selectHandle = (value) => {
        if (value) {
            this.props.dispatch(getStu(value));
            this.setState({
                roundSelect: value
            })
        }
        // let key = value.slice(-2);
        // let radioSetProd = "";
        // switch (key) {
        //     case "UM":
        //         radioSetProd = "男子35岁以上"
        //         break;
        //     case "DM":
        //         radioSetProd = "男子35岁以下"
        //         break;
        //     case "UF":
        //         radioSetProd = "女子35岁以上"
        //         break;
        //     case "DF":
        //         radioSetProd = "女子35岁以下"
        //         break;
        // }
        // this.setState({
        //     radioSetProd: radioSetProd,
        //     selectValue: value
        // })
    };
    renderTipsDiv = () => {
        return (
            <div className="ss-form-tips">
                <Icon type="coffee" style={{ display: "block", fontSize: "36px", marginBottom: "10px" }} />
                <p>请在上方选择需要设置的批次班级</p>
            </div>
        )
    }
    render() {
        const ruleContent = (
            <div>
                <p>将会根据年龄自动将一个批次里的学生分配至相应的班级</p>
                <p>学生的考号将会自动生成，请保证一个班级里的人数不会超过1千名</p>
                <p>生成编号为"S(student)" + 对应班级号 + 三位随机编号</p>
                <p style={{ color: "red" }}>学生可以批量进行删除,重复导入表格可以增加和修改学生,不能删除学生</p>
                <p style={{ color: "red" }}>确认成功上传表单后，将会锁定批次无法删除，请注意！</p>
                <p style={{ color: "red" }}>更新后若需再修改，请在导出的表单上进行修改</p>
            </div>
        );
        const ruleTitle = (
            <span>规则详情</span>
        );
        let { roundData } = this.props.stuset;
        return (
            <div className="body-ss-ctn">
                <div className="body-ss-setbar">
                    <div className="leftinfo">
                        <p>请在右侧选择考核批次</p>
                        <p>请自行对考生进行查重</p>
                    </div>
                    <div className="selectbar">
                        <span className="select-info">考核批次: </span>
                        <Select
                            className="ss-class-select"
                            onSelect={this.selectHandle}
                            placeholder="请选择考核批次"
                        >
                            {
                                roundData.map((item) => {
                                    return <Select.Option value={item.key} key={item.key}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </div>
                    <Popover content={ruleContent} title={ruleTitle} placement="bottom">
                        <div className="rightinfo">
                            <p>考生导入及生成规则</p>
                            <Icon type="question-circle" style={{ color: "#0088A8", fontSize: "22px" }} />
                        </div>
                    </Popover>
                </div>
                <div className="body-ss-tablebar">
                    {
                        this.state.roundSelect ? <StuSetTable selectRound={this.state.roundSelect} /> : this.renderTipsDiv()
                    }
                </div>
            </div>
        )
    }
}
function select(state) {
    return {
        stuset: state.stuset
    }
}
export default connect(select)(StudentSetter);