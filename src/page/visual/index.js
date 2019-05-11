import React from 'react';
import { connect } from 'react-redux';
import Header from '../../component/header/index.jsx';
import './index.less';
import CenterDiv from '../../pureComponent/centerDiv/index';
import { Radio, message, Select, AutoComplete, Icon, Table, Button } from 'antd';
import AutoCompleteInput from '../../pureComponent/autoCompleteInput/index.jsx';
import fetch from '../../common/fetch.jsx';
import { Host } from '../../config/host.jsx';
import { getScore, getClassInfo } from '../score/actions/index';
import { getStuScore } from './actions/index.js';
import utils from '../../common/utils.jsx';
import VisualCharts from './components/visualBody/index';
class Visual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuList: [],
            radioSelect: "stu", //默认查找学生
            isSelect: false, //默认未完成选择
            visualModel: true, //true表示是表单，false表示是可视化报表,默认是true
            selectStuId: "",
            stuInfo: []
        }
    };
    radioChangeHandle = (e) => {
        this.setState({
            radioSelect: e.target.value,
            selectStuId: ""
        });
        this.changeSelect(false);
    };
    componentDidMount() {
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.getStuId,
            method: "GET"
        }
        fetch(options).then((data) => {
            if (data.ret) {
                this.setState({
                    stuList: data.data
                });
            } else {
                message.error(data.errMsg);
            }
        })
            .catch((err) => {
                message.error("请检查网络");
            });
        this.props.dispatch(getClassInfo());
    };
    //------
    searchSelectHandle = (value) => {
        console.log(value);
        //合法性检测
        let regxStuId = /^SEC[\d]{5,6}[\S]{2}[\d]{3}$/g;
        if (regxStuId.test(value)) {
            this.changeSelect(true);
            this.setState({
                selectStuId: value
            },()=>{
                if (!this.state.visualModel) {
                    this.getStuInfo();
                };
            });

            this.props.dispatch(getStuScore(value, this.getScoreCallBack));
        } else {
            message.warning("该学号不合法,请检查输入");
        }
    };
    searchStuHandle = (value) => {
        console.log(value);
        this.changeSelect(true);
        this.setState({
            selectStuId: value
        },()=>{
            if (!this.state.visualModel) {
                this.getStuInfo();
            };
        });
        this.props.dispatch(getStuScore(value, this.getScoreCallBack));
    };
    getScoreCallBack = (msg) => {
        message.error(msg);
        this.changeSelect(false);
    };
    renderAutoOptions = (item) => {
        return (
            <AutoComplete.Option key={item.id} text={item.id}>
                <Icon type="user" style={{ fontSize: "16px", color: "#1969a9" }} />
                <span className="autoInput-item">{`${item.id}(${item.name})`}</span>
            </AutoComplete.Option>
        )
    };
    //----
    selectClassHandle = (value) => {
        this.changeSelect(true);
        this.props.dispatch(getScore(value, this.getScoreCallBack));
    };
    //---
    changeSelect = (bool) => {
        this.setState({
            isSelect: bool
        })
    };
    renderTipsDiv = () => {
        return (
            <div className="vis-table-tips">
                <Icon type="coffee" style={{ display: "block", fontSize: "36px", marginBottom: "10px" }} />
                <p>请在上方填选查询条件</p>
            </div>
        )
    };
    //---
    visualBtnClickHandle = () => {
        this.setState({
            visualModel: !this.state.visualModel,
            stuInfo: []
        });
        if (this.state.visualModel) {
            this.getStuInfo();
        };
    };
    exportBtnClickHandle = () => {
        let exportScore = this.state.radioSelect === "stu" ? this.props.visual.stuScoreData : this.props.score.scoreData;
        if (!exportScore.length) {
            return;
        } else {
            utils.excelParse(exportScore, `score`);
        }
    };
    //---
    getStuInfo = () => {
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.getStuInfo,
            data: {
                key: this.state.selectStuId
            }
        };
        fetch(options).then((data) => {
            if (data.ret) {
                this.setState({
                    stuInfo: data.data
                })
            } else {
                message.error("拉取学生信息失败");
                this.setState({
                    stuInfo: []
                })
            }
        })
            .catch(() => {
                message.error("网络连接失败");
                this.setState({
                    stuInfo: []
                })
            })
    };
    render() {
        let { nameData } = this.props.score;
        let { stuScoreData } = this.props.visual;
        const stuColumns = [{
            title: '科目序号',
            dataIndex: 'subSort',
            key: 'subSort',
            align: "center",
            width: 150
        }, {
            title: '科目名称',
            dataIndex: 'subName',
            key: 'subName',
            align: "center",
            width: 200
        }, {
            title: '考核结果',
            dataIndex: 'calScore',
            key: 'calScore',
            align: 'center',
            width: 150,
            filters: [
                { text: '不及格', value: 1 },
                { text: '优秀', value: 2 }
            ],
            onFilter: (value, record) => {
                console.log(record.calScore);
                switch (value) {
                    case 1:
                        return record.calScore < 60
                    case 2:
                        return record.calScore >= 90
                    default:
                        break;
                }
            }
        }, {
            title: '成绩',
            dataIndex: 'Score',
            key: 'Score',
            align: 'center',
            width: 150
        }, {
            title: '加权成绩',
            dataIndex: 'mixedScore',
            key: 'mixedScore',
            align: 'center',
            width: 150
        }]
        const columns = [{
            title: '考生编号',
            dataIndex: 'stuId',
            key: 'stuId',
            align: "center",
            width: 200,
            fixed: "left",
            sorter: (a, b) => parseInt(a.stuId.slice(-3)) - parseInt(b.stuId.slice(-3)),
            defaultSortOrder: "ascend"
        }, {
            title: '班级编号',
            dataIndex: 'examId',
            key: 'examId',
            align: "center",
            width: 200,
            fixed: "left"
        }, {
            title: '学生姓名',
            dataIndex: 'stuName',
            key: 'stuName',
            align: "center",
            width: 150,
        }, {
            title: '科目序号',
            dataIndex: 'subSort',
            key: 'subSort',
            align: "center",
            width: 150,
            filters: [
                { text: '科目一', value: '科目一' },
                { text: '科目二', value: '科目二' },
                { text: '科目三', value: '科目三' },
                { text: '科目四', value: '科目四' },
                { text: '科目五', value: '科目五' },
                { text: '科目六', value: '科目六' },
                { text: '科目七(只存在于35岁以下)', value: '科目七' }
            ],
            onFilter: (value, record) => record.subSort === value
        }, {
            title: '科目名称',
            dataIndex: 'subName',
            key: 'subName',
            align: "center",
            width: 200
        }, {
            title: '考核结果',
            dataIndex: 'calScore',
            key: 'calScore',
            align: 'center',
            width: 150,
            filters: [
                { text: '不及格', value: 1 },
                { text: '优秀', value: 2 }
            ],
            onFilter: (value, record) => {
                console.log(record.calScore);
                switch (value) {
                    case 1:
                        return record.calScore < 60
                    case 2:
                        return record.calScore >= 90
                    default:
                        break;
                }
            }
        }, {
            title: '成绩',
            dataIndex: 'Score',
            key: 'Score',
            align: 'center',
            width: 150
        }, {
            title: '加权成绩',
            dataIndex: 'mixedScore',
            key: 'mixedScore',
            align: 'center',
            width: 150
        }];
        console.log(this.props);
        let sumScore = 0;
        stuScoreData.forEach((item)=>{
            if(item.mixedScore != -1){
                sumScore = sumScore + item.mixedScore;
            }
        });
        return (
            <div style={{ "height": "100%", "width": "100%" }}>
                <Header />
                <CenterDiv extraClass="vis-ctn" vertical={true}>
                    <div className="vis-header">
                        <div className="vis-header-radio">
                            <span className="radio-tips">请选择查询方式:  </span>
                            <Radio.Group onChange={this.radioChangeHandle} defaultValue="stu" size="large">
                                <Radio.Button value="stu">按学生</Radio.Button>
                                {this.state.visualModel ? <Radio.Button value="cls">按班级</Radio.Button> : null}
                            </Radio.Group>
                        </div>
                        <div className="vis-header-in">
                            {
                                this.state.radioSelect === "stu" ?
                                    <AutoCompleteInput
                                        placeholder="请输入学号"
                                        extraClass="vis-input-stu"
                                        searchMentionHandle={this.searchStuHandle}
                                        searchHandle={this.searchSelectHandle}
                                        dataSource={this.state.stuList}
                                        renderOption={this.renderAutoOptions}
                                        isCollapse={false}
                                    />
                                    :
                                    <Select
                                        className="vis-select-class"
                                        onSelect={this.selectClassHandle}
                                        placeholder="请选择班级批次"
                                    >
                                        {
                                            nameData.map((item) => {
                                                return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                            })
                                        }
                                    </Select>
                            }
                        </div>
                        <div className="vis-header-btn">
                            <Button
                                type="primary"
                                icon={this.state.visualModel ? "radar-chart" : "form"}
                                size="large"
                                onClick={this.visualBtnClickHandle}
                                disabled={!this.state.isSelect || this.state.radioSelect != "stu"}
                                className="charts-btn"
                            >
                                {this.state.visualModel ? "可视化报表" : "表单查询"}
                            </Button>
                            <Button
                                type="primary"
                                icon="export"
                                size="large"
                                onClick={this.exportBtnClickHandle}
                                disabled={!this.state.isSelect || !this.state.visualModel}
                            >
                                导出报表
                            </Button>
                        </div>
                    </div>
                    <div className="vis-body">
                        {
                            this.state.visualModel ?
                                (
                                    this.state.isSelect ?
                                        (
                                            <div className = "vis-table-body">
                                                <Table
                                                    className="vistable"
                                                    dataSource={this.state.radioSelect === "stu" ? this.props.visual.stuScoreData : this.props.score.scoreData}
                                                    columns={columns}
                                                    bordered={true}
                                                    rowKey={(item) => {
                                                        return item.stuId + item.examId + item.subSort
                                                    }}
                                                    pagination={false}
                                                    loading={this.state.radioSelect === "stu" ? !this.props.visual.getStuScoreStatus : !this.props.score.getScoreStatus}
                                                    scroll={{ y: 480 , x : '110%'}}
                                                />
                                            </div>
                                        )
                                        :
                                        this.renderTipsDiv()
                                )
                                :
                                (
                                    <div className="vis-charts-body">
                                        <div className="vis-charts-stuInfo">
                                            <p>
                                                <span>考生编号: </span><span>{this.state.stuInfo.id}</span>
                                                <span>姓名: </span><span>{this.state.stuInfo.name}</span>
                                            </p>
                                            <p>
                                                <span>年龄: </span><span>{this.state.stuInfo.age}</span>
                                                <span>性别: </span><span>{this.state.stuInfo.sex}</span>
                                            </p>
                                            <p>
                                                <span>身份证号: </span><span>{this.state.stuInfo.cid}</span>
                                                <span>考核类别: </span><span>{this.state.stuInfo.type}</span>
                                            </p>
                                            <p>
                                                <span>联系电话: </span><span>{this.state.stuInfo.tel}</span>
                                                <span>电子邮件: </span><span>{this.state.stuInfo.email}</span>
                                            </p>
                                            <p>
                                                <span>送培单位: </span><span>{this.state.stuInfo.unit}</span>
                                            </p>
                                            <p>
                                                <span>地址: </span><span>{this.state.stuInfo.address}</span>
                                            </p>
                                        </div>
                                        <div className="vis-charts-stuScore">
                                            <Table
                                                className="vistable-charts"
                                                dataSource={this.props.visual.stuScoreData}
                                                columns={stuColumns}
                                                bordered={true}
                                                rowKey={(item) => {
                                                    return item.stuId + item.examId + item.subSort
                                                }}
                                                pagination={false}
                                                loading={!this.props.visual.getStuScoreStatus}
                                                scroll={{ y: 230 , x : 800}}
                                            />
                                        </div>
                                        <div className="vis-charts-raddar">
                                            <VisualCharts />
                                            <div className = "vis-charts-tips">
                                                <p>根据科目权重该生综合成绩为:{sumScore}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </CenterDiv>
            </div>
        )
    }
}

function select(state) {
    return {
        visual: state.visual,
        score: state.score
    }
}
export default connect(select)(Visual);