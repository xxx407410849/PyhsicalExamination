import React from 'react';
import { Table, message, Button , Popconfirm , Popover , Modal} from 'antd';
import './index.less';
import ExcelBtn from '../../../../../../component/uploadBtn';
import { Host } from '../../../../../../config/host.jsx';
import utils from '../../../../../../common/utils.jsx';
import fetch from '../../../../../../common/fetch.jsx';
const deleteTips = (
    <div>
        <p>可在上表进行批量选择删除</p>
        <p style={{ "color": "red" }}>请谨慎选择删除航空公司，过多删除会影响系统稳定性</p>
    </div>
);
const importTips = (
    <div>
        <p>做其他用处时请自行修改表头文字</p>
        <p style={{ color: "red" }}>保证用导入的表，表头未被修改</p>
        <p style={{ color: "red" }}>请不要修改航空公司ID!!请置空或者保持其不变</p>
        <p></p>
    </div>
)
const exportTips = (
    <div>
        <p style={{ color: "green" }}>导入后为预览状态，请确认表单无误再提交</p>
        <p style={{ color: "red" }}>但请保证用做导入的表，表头未被修改</p>
        <p style={{ color: "red" }}>请不要修改航空公司ID!!请置空或者保持其不变</p>
    </div>
)
const defaultArray = [{ id: "", name: "", tel: "", address: "", email: "" }];
class AirlineSetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            airlineData: [], //航空公司数据
            airlineGetStatus: true, //得到航空数据的状态
            selectKey: "", //删除
            selectStatus: false, //默认不允许删除
            uploadData: [],//上传表数据
            deleteConfirmVisable: false, //默认不显示确认框
            tipsVisable: false, //默认不显示删除提示
            showUploadModal: false, //默认不显示反馈框
            uploadMsg: []
        }
    }
    componentDidMount(){
        this.getAirline();
    }
    getAirline = () => {
        this.setState({
            airlineGetStatus: false
        });
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.getAirline,
            method: 'GET'
        }
        fetch(options).then((data) => {
            if (data.ret) {
                this.setState({
                    airlineData: data.data,
                    airlineGetStatus: true
                })
            } else {
                message.error(data.errMsg);
            }
        })
            .catch((err) => {
                message.error("网络连接失败");
            })
    };
    delAirline = () => {
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.deleteAirline,
            data: this.state.selectKey
        }
        fetch(options).then((data) => {
            if (data.ret) {
                message.success("删除成功");
                this.getAirline();
                this.setState({
                    selectKey : ""
                });
            } else {
                message.error(data.errMsg);
            }
        })
            .catch((err) => {
                message.error("网络连接失败");
            })
    };
    setAirline = (data) => {
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.importAirline,
            data : data
        }
        fetch(options).then((data)=>{
            if(data.ret){
                this.setState({
                    uploadMsg : data.msg,
                    showUploadModal : true
                })
                this.getAirline();
            }else{
                message.error(data.errMsg);
            }
        })
        .catch((err)=>{
                message.error("网络连接失败");
        })
    }
    selectChangeHandle = (key) => {
        this.setState({
            selectKey: key,
            selectStatus: (key.length != 0)
        })
    };
    deleteConfirmShow = (visiable) => {
        console.log(visiable);
        if (!visiable) {
            this.setState({
                deleteConfirmVisable: visiable
            });
            return;
        }
        if (!this.state.selectStatus) return;
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
    };
    deleteHandle = () => {
        this.delAirline();
    };
    uploadHandle = (data) => {
        //--todo-- 这里需要一个深比较
        if (this.beforeData && this.beforeData === data) {
            message.warning("同一表单，或未修改表单只允许提交一次");
            return;
        }
        this.beforeData = data; //同一个data只允许提交一次
        this.setState({
            uploadData: data,
            selectKey: ""
        })
    };
    importHandle = () => {
        let {airlineData} = this.state;
        if (!airlineData.length) {
            utils.excelParse(defaultArray, `airline`);
        } else {
            utils.excelParse(airlineData, `airline`);
        }
    };
    comfirmUpload = () => {
        this.setAirline(this.state.uploadData);
        this.setState({
            uploadData : []
        })       
    };
    cancelUpload = () => {
        this.setState({
            uploadData : []
        })
    };
    hideUploadModal = () => {
        this.setState({
            showUploadModal : false
        })
    };
    render() {
        const columns = [{
            title: '航空公司编号',
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
            title: '联系电话',
            dataIndex: 'tel',
            key: 'tel',
            align: "center",
            width: 200
        }, {
            title: '地址',
            dataIndex: 'address',
            key: 'type',
            align: 'center',
            className: 'column-address',
            width: 250
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        }];

        return (
            <div className="as-ctn">
                <Table
                    className="as-table"
                    dataSource={this.state.uploadData.length != 0 ? this.state.uploadData : this.state.airlineData}
                    columns={columns}
                    bordered={true}
                    rowKey="id"
                    pagination={false}
                    loading={!this.state.airlineGetStatus}
                    scroll={{ y: 500 }}
                    rowSelection={this.state.uploadData.length === 0 ? {
                        fixed: true,
                        onChange: this.selectChangeHandle
                    } : null}
                    footer={
                        () => (
                            <div className="astable-footer">
                                <Popover
                                    content={deleteTips}
                                    trigger="hover"
                                    placement="bottom"
                                    visible={this.state.tipsVisable}
                                    onVisibleChange={this.deleteTipsShow}
                                >
                                    <Popconfirm
                                        title="确认要删除这些航空公司?"
                                        okText="yes"
                                        cancelText="no"
                                        visible={this.state.deleteConfirmVisable}
                                        onVisibleChange={this.deleteConfirmShow}
                                        onConfirm={this.deleteHandle}
                                    >
                                        <Button type="danger" disabled={!this.state.selectStatus} className="btn-delete">删除</Button>
                                    </Popconfirm>
                                </Popover>
                                <Popover
                                    content={importTips}
                                    trigger="hover"
                                    placement="bottom"
                                >
                                    <Button type="primary" icon="download" onClick={this.importHandle} className="btn-import">导出公司表</Button>
                                </Popover>

                                <ExcelBtn hoverTips={exportTips} btnText={"上传公司表"} callBack={this.uploadHandle} />
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
                                {this.state.uploadData != 0 && <Button type="primary" icon="cloud-upload"  onClick={this.comfirmUpload} className="btn-uploadComfirm">确认提交表单</Button>}
                                {this.state.uploadData != 0 && <Button type="dashed" icon="delete" onClick={this.cancelUpload} className="btn-uploadComfirm">取消提交表单</Button>}
                            </div>
                        )
                    }
                >

                </Table>
            </div>
        )
    }
}

export default AirlineSetter;