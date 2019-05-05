import './index.less';
import Header from '../../component/header/index.jsx';
import React from 'react';
import { connect } from 'react-redux';
import { Select, Popover, Icon, Table, Button, message, Modal } from 'antd';
import { Host } from '../../config/host.jsx';
import Utils from '../../common/utils.jsx';
import CenterDiv from '../../pureComponent/centerDiv/index';
import { getClassInfo, getScore, setScore } from './actions';
import utils from '../../common/utils.jsx';
import ExcelBtn from '../../component/uploadBtn';
class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectKey: "",
            uploadData: [],
            showUploadModal: false
        }
    }
    componentDidMount() {
        this.props.dispatch(getClassInfo());
    };
    componentWillUnmount() {
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.score.errMsg != "" && this.props.score.errMsg != nextProps.score.errMsg) {
            message.error(nextProps.score.errMsg);
        }
    }
    selectHandle = (value) => {
        if (value) {
            this.props.dispatch(getScore(value));
            this.setState({
                selectKey: value,
                uploadData: []
            })
        }
    };
    importHandle = () => {
        let { scoreData } = this.props.score;
        if (!scoreData.length) {
            return;
        } else {
            utils.excelParse(scoreData, `score-${this.state.selectKey}`);
        }
    };
    uploadHandle = (data) => {
        //--todo-- 这里需要一个深比较
        if (this.beforeData && this.beforeData === data) {
            message.warning("同一表单，或未修改表单只允许提交一次");
            return;
        }
        console.log(data);
        this.beforeData = data; //同一个data只允许提交一次
        this.setState({
            uploadData: data
        })
    };
    comfirmUpload = () => {
        let data = {
            data: this.state.uploadData,
            key: this.state.selectKey
        }
        this.props.dispatch(setScore(data,this.setScoreCallBack));
    };
    cancelUpload = () => {
        this.setState({
            uploadData: []
        })
    };
    renderTipsDiv = () => {
        return (
            <div className="sc-table-tips">
                <Icon type="coffee" style={{ display: "block", fontSize: "36px", marginBottom: "10px" }} />
                <p>请在上方选择需要设置的批次班级</p>
            </div>
        )
    };
    setScoreCallBack = () => {
        this.setState({
            uploadData : [],
            showUploadModal : true
        })
    };
    hideUploadModal = () => {
        this.setState({
            showUploadModal : false
        })
    };
    render() {
        let { nameData, scoreData, getScoreStatus, msg } = this.props.score;
        const selectTips = (
            <div>
                <p>第一次查询，将会自动生成成绩表</p>
                <p>请保证导入时表头不发生改变</p>
                <p>删除学生将会同时删除该学生所有成绩数据</p>
                <p style={{ color: "red" }}>请不要修改考核结果，考核结果将会根据成绩自动演算</p>
                <p style={{ color: "red" }}>请正确导入成绩数据，时间数据请用英文:分割,如10:10</p>
            </div>
        );
        const importTips = (
            <div>
                <p>作其他作用时请自行修改表头</p>
                <p>作导入作用时请保证表头不发生改变</p>
                <p style={{ color: "red" }}>可以修改除id外任意数据，但不会更新到学生基础数据上</p>
            </div>
        );
        const exportTips = (
            <div>
                <p style={{ color: "red" }}>请保证表头不变</p>
                <p style={{ color: "red" }}>请保证不修改科目以及id信息，若需修改请联系相关负责人进行基础设置</p>
                <p style={{ color: "red" }}>若需要更改学生基础数据，请在学生基础数据处根据规则进行修改</p>
            </div>
        )
        // subName : String, //科目名字
        // subSort : String, //科目序列
        // examId : String, //班级id
        // stuId : String, //学生id
        // stuName : String, //学生姓名
        // calScore : Number, //计算后的成绩
        // Score : Number //计算前成绩
        const columns = [{
            title: '考生编号',
            dataIndex: 'stuId',
            key: 'stuId',
            align: "center",
            width: 200,
            fixed: "left",
            sorter: (a,b) => parseInt(a.stuId.slice(-3)) - parseInt(b.stuId.slice(-3)),
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
                { text: '优秀', value: 2}
            ],
            onFilter: (value , record)=>{
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
        }];
        return (
            <div style={{ "height": "100%", "width": "100%" }}>
                <Header history = {this.props.history}/>
                <CenterDiv extraClass="sc-ctn" vertical={true}>
                    <div className="sc-header">
                        <Popover title={<span>成绩生成与导入规则：</span>} content={selectTips}>
                            <div className="sc-select-tips">
                                <p>成绩生成与导入规则: </p>
                                <Icon type="question-circle" style={{ color: "#0088A8", fontSize: "22px" }} />
                            </div>
                        </Popover>
                        <div className="sc-select-bar">
                            <span className="sc-select-info">请选择班级批次: </span>
                            <Select
                                className="sc-select"
                                onSelect={this.selectHandle}
                                placeholder="班级批次"
                            >
                                {
                                    nameData.map((item) => {
                                        return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="sc-body">
                        {
                            this.state.selectKey ? <Table
                                className="sctable"
                                dataSource={this.state.uploadData.length != 0 ? this.state.uploadData : scoreData}
                                columns={columns}
                                bordered={true}
                                rowKey={(item) => {
                                    return item.stuId + item.examId + item.subSort
                                }}
                                pagination={false}
                                loading={!getScoreStatus}
                                scroll={{ y: 475 }}
                                footer={() => (
                                    scoreData.length != 0 ?
                                        <div className="sctable-footer">
                                            <Popover
                                                content={importTips}
                                                trigger="hover"
                                                placement="bottom"
                                            >
                                                <Button type="primary" icon="download" onClick={this.importHandle} className="btn-import">导出成绩表</Button>
                                            </Popover>
                                            <ExcelBtn hoverTips={exportTips} btnText={"上传成绩表"} callBack={this.uploadHandle} />
                                            <Modal title="上传文件结果"
                                                visible={this.state.showUploadModal}
                                                onCancel={this.hideUploadModal}
                                                footer={null}
                                                maskClosable={false}
                                            >
                                                <p>本次上传成功共{msg.acceptNum}条</p>
                                                <p>本次上传失败共{msg.rejectNum}条</p>
                                                <p>失败提示如下:</p>
                                                {
                                                    msg.rejectMsg &&
                                                    msg.rejectMsg.map((item, idx) => {
                                                        return <p style={{ color: "red", fontSize: "10px" }}>{item}</p>
                                                    })
                                                }
                                            </Modal>
                                            {this.state.uploadData != 0 && <Button type="primary" icon="cloud-upload" onClick={this.comfirmUpload} className="btn-uploadComfirm">确认提交表单</Button>}
                                            {this.state.uploadData != 0 && <Button type="dashed" icon="delete" onClick={this.cancelUpload} className="btn-uploadComfirm">取消提交表单</Button>}
                                        </div>
                                        :
                                        null
                                )}
                            /> : this.renderTipsDiv()
                        }
                    </div>
                </CenterDiv>
            </div>
        )
    }
}

function select(state) {
    return {
        score: state.score,
        subset: state.subset
    };
}

export default connect(select)(Score);