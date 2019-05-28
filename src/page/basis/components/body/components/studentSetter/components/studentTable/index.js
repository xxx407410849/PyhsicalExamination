import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import { Table, Button, Popover, Popconfirm, Upload, Input, message, Modal } from 'antd';
import { deleteStu, setStu } from '../../actions/index';
import ExcelBtn from '../../../../../../../../component/uploadBtn/index';
import utils from '../../../../../../../../common/utils.jsx';
const deleteTips = (
    <div>
        <p>可在上表进行批量选择删除</p>
        <p style={{ "color": "red" }}>请谨慎选择删除学生，对某批次的过多删除会影响系统稳定性</p>
    </div>
);
const importTips = (
    <div>
        <p>做其他用处时请自行修改表头文字</p>
        <p style={{ color: "red" }}>保证用导入的表，表头未被修改</p>
        <p style={{ color: "red" }}>请不要修改考生ID以及班级ID!!请置空或者保持其不变</p>
        <p></p>
    </div>
)
const exportTips = (
    <div>
        <p style={{ color: "green" }}>导入后为预览状态，请确认表单无误再提交</p>
        <p style={{ color: "red" }}>但请保证用做导入的表，表头未被修改</p>
        <p style={{ color: "red" }}>请不要修改考生ID以及班级ID!!请置空或者保持其不变</p>
        <p style={{ color: "red" , fontWeight: "bold"}}>学生姓名(name)，性别(sex)，身份证(cid)，类型(type)，送培单位(unit)不能为空</p>
        <p style={{ color: "red" , fontWeight: "bold"}}>类型(type)请设置为“初任训练”或者“定期训练”</p>
        <p style={{ color: "red" , fontWeight: "bold"}}>送配单位(unit)请保证其与航空公司设置中存在的或将要存在的航空公司名字一致</p>
    </div>
)
const defaultArray = [{ id: "", examId: "", name: "", age: "", sex: "", tel: "", unit: "", cid: "", type: "", email: "",address: "" }];
class StuSetTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteStatus: false, //默认不能删除
            radioChooseKey: "", //默认无选中行
            deleteConfirmVisable: false, //默认不显示确认框
            tipsVisable: false, //默认不显示删除提示
            showUploadModal: false, //默认不显示上传反馈弹窗
            uploadMsg: {}, // 上传反馈数据
            uploadData: [] //上传数据
        }
    }
    // changeRenderCheck = (text) => {
    // 	if (text === false) return "否";
    // 	if (text === true) return "是";
    // 	return "None";
    // };
    radioChangeHandle = (key, row) => {
        this.setState({
            deleteStatus: (key.length != 0),
            radioChooseKey: key
        })
    };
    deleteConfirmShow = (visiable) => {
        if (!visiable) {
            this.setState({
                deleteConfirmVisable: visiable
            });
            return;
        }
        if (!this.state.deleteStatus) return;
        else {
            this.setState({
                deleteConfirmVisable: visiable
            })
        }
    };
    deleteTipsShow = (visiable) => {
        if (!visiable) {
            this.setState({
                tipsVisable: visiable
            })
        }
        if (this.state.deleteStatus) return;
        else {
            this.setState({
                tipsVisable: visiable
            })
        }
    }
    deleteExamHandle = () => {
        console.log(this.state.radioChooseKey);
        this.props.dispatch(deleteStu(this.state.radioChooseKey));
        this.setState({
            radioChooseKey: ""
        })
    }
    importHandle = () => {
        let { stuData } = this.props.stuset;
        if (!stuData.length) {
            utils.excelParse(defaultArray, `student-${this.props.selectRound}`);
        } else {
            utils.excelParse(stuData, `student-${this.props.selectRound}`);
        }
    }
    uploadHandle = (data) => {
        //--todo-- 这里需要一个深比较
        if (this.beforeData && this.beforeData === data) {
            message.warning("同一表单，或未修改表单只允许提交一次");
            return;
        }
        this.beforeData = data; //同一个data只允许提交一次
        this.setState({
            uploadData: data,
            radioChooseKey: ""
        })
    }
    comfirmUpload = () => {
        this.props.dispatch(setStu(
            {
                data: this.state.uploadData,
                round: this.props.selectRound
            },
            this.setStuCallBack
        ));
        this.setState({
            uploadData: []
        });
    }
    cancelUpload = () => {
        this.setState({
            uploadData: []
        })
    }
    setStuCallBack = (msg) => {
        console.log(msg);
        this.setState({
            showUploadModal: true,
            uploadMsg: msg
        })
    }
    hideUploadModal = () => {
        this.setState({
            uploadMsg: {},
            showUploadModal: false
        })
    }
    render() {
        console.log(this.props);
        let { stuData, stuGetLoading, stuSetStatus } = this.props.stuset;
        // id : {
        //     type : String, //考生编号
        //     index : true,
        //     unique : true
        // },
        // examId : String, //考试分组编号
        // name : String, //名称
        // age : Number, //年龄
        // sex : String, //性别
        // tel : String, //联系电话
        // unit : String, //送培单位
        // score : [], //mixedArray -- 成绩
        // cid : String, //身份证
        // type : String, //学生类型（复或者初试）
        // email : String //邮箱
        const columns = [{
            title: '考生编号',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: 200,
            fixed: "left"
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: "center",
            width: 100,
            fixed: "left"
        }, {
            title: '送培单位',
            dataIndex: 'unit',
            key: 'unit',
            align: "center",
            width: 300,
        }, {
            title: '班级编号',
            dataIndex: 'examId',
            key: 'examId',
            align: "center",
            width: 200
        }, {
            title: '联系电话',
            dataIndex: 'tel',
            key: 'tel',
            align: "center",
            width: 175
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            align: 'center',
            width: 100
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            align: 'center',
            width: 100
        }, {
            title: '身份证',
            dataIndex: 'cid',
            key: 'cid',
            align: 'center',
            width: 200
        }, , {
            title: '学生类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            width: 150
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            width: 150
        },{
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
            width: 250
        }];
        return (
            <Table
                className="stutable"
                dataSource={this.state.uploadData.length != 0 ? this.state.uploadData : stuData}
                columns={columns}
                bordered={true}
                rowKey="id"
                pagination={false}
                loading={!stuGetLoading}
                scroll={{ y: 382, x: 2000 }}
                rowSelection={this.state.uploadData.length === 0 ? {
                    fixed: true,
                    onChange: this.radioChangeHandle
                } : null}
                footer={
                    () => (
                        <div className="stutable-footer">
                            <Popover
                                content={deleteTips}
                                trigger="hover"
                                placement="bottom"
                                visible={this.state.tipsVisable}
                                onVisibleChange={this.deleteTipsShow}
                            >
                                <Popconfirm
                                    title="确认要删除这些学生?"
                                    okText="yes"
                                    cancelText="no"
                                    visible={this.state.deleteConfirmVisable}
                                    onVisibleChange={this.deleteConfirmShow}
                                    onConfirm={this.deleteExamHandle}
                                >
                                    <Button type="danger" disabled={!this.state.deleteStatus} className="btn-delete">删除</Button>
                                </Popconfirm>
                            </Popover>
                            <Popover
                                content={importTips}
                                trigger="hover"
                                placement="bottom"
                            >
                                <Button type="primary" icon="download" onClick={this.importHandle} className="btn-import">导出学生表</Button>
                            </Popover>
                            <ExcelBtn hoverTips={exportTips} btnText={"上传学生表"} callBack={this.uploadHandle} />
                            <Modal title="上传文件结果"
                                visible={this.state.showUploadModal}
                                onCancel={this.hideUploadModal}
                                footer={null}
                                maskClosable={false}
                            >
                                <p>本次上传成功共{this.state.uploadMsg.acceptNum}条</p>
                                <p>本次上传失败共{this.state.uploadMsg.rejectNum}条</p>
                                <p>失败提示如下:</p>
                                {
                                    this.state.uploadMsg.rejectMsg &&
                                    this.state.uploadMsg.rejectMsg.map((item, idx) => {
                                        return <p style={{ color: "red", fontSize: "10px" }}>{item}</p>
                                    })
                                }
                            </Modal>
                            {this.state.uploadData != 0 && <Button type="primary" icon="cloud-upload" loading={!stuSetStatus} onClick={this.comfirmUpload} className="btn-uploadComfirm">确认提交表单</Button>}
                            {this.state.uploadData != 0 && <Button type="dashed" icon="delete" loading={!stuSetStatus} onClick={this.cancelUpload} className="btn-uploadComfirm">取消提交表单</Button>}
                        </div>
                    )
                }
            />
        )
    }
}
function select(state) {
    return {
        stuset: state.stuset
    }
}
export default connect(select)(StuSetTable);
