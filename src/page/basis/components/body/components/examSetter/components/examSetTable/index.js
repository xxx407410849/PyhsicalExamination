import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import { Table, Button, Popover, Popconfirm } from 'antd';
import { examDelete } from '../../actions/index';
import utils from '../../../../../../../../common/utils.jsx';
const deleteTips = (
	<div>
		<p>请先在上表选择一行后进行删除</p>
		<p>不允许删除除名字和编号任意值确定的批次</p>
		<p style={{ "color": "red" }}>将会同时删除该批次四个班级</p>
	</div>
);
const importTips = (
	<div>
		<p>做其他用处时请自行修改表头文字</p>
		<p style = {{color : "red"}}>但请保证用做以后导入的表，表头未被修改</p>
	</div>
)
class ExamSetTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteStatus: false, //默认不能删除
			radioChooseKey: "", //默认无选中行
			deleteConfirmVisable: false, //默认不显示确认框
			tipsVisable: false //默认不显示删除提示
		}
	}
	changeRenderCheck = (text) => {
		if (text === false) return "否";
		if (text === true) return "是";
		return "None";
	};
	radioChangeHandle = (key, row) => {
		this.setState({
			deleteStatus: true,
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
		this.props.dispatch(examDelete(this.state.radioChooseKey[0]));
		this.setState({
			radioChooseKey : ""
		})
	}
	importExamHandle = () => {
		let { examData } = this.props.examset;
		utils.excelParse(examData,"class");
	}
	render() {
		console.log(this.props);
		let { examData, examGetLoading, examGetStatus, examSetStatus, examSetLoading } = this.props.examset;
		const columns = [{
			title: '编号',
			dataIndex: 'id',
			key: 'id',
			align: "center",
			width: 250
		}, {
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			align: "center",
			width: 350
		}, {
			title: '科目是否确定',
			dataIndex: 'isSub',
			key: 'isSub',
			render: this.changeRenderCheck,
			align: "center"
		}, {
			title: '名单是否确定',
			dataIndex: 'isStudent',
			key: 'isStudent',
			render: this.changeRenderCheck,
			align: "center"
		}, {
			title: '成绩是否确定',
			dataIndex: 'isScore',
			key: 'isScore',
			render: this.changeRenderCheck,
			align: "center"
		}];
		return (
			<Table
				className = "examtable"
				dataSource={examData}
				columns={columns}
				bordered={true}
				rowKey="id"
				pagination={false}
				loading={!examGetLoading}
				scroll={{ y: 382 }}
				rowSelection={{
					fixed: true,
					type: "radio",
					onChange: this.radioChangeHandle
				}}
				footer={
					() => (
						<div className="examtable-footer">
							<Popover
								content={deleteTips}
								trigger="hover"
								placement="bottom"
								visible={this.state.tipsVisable}
								onVisibleChange={this.deleteTipsShow}
							>
								<Popconfirm
									title="确认要删除该批次?"
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
								<Button type="primary" onClick={this.importExamHandle} className="btn-import">导出班级信息</Button>
							</Popover>
						</div>
					)
				}
			/>
		)
	}
}
function select(state) {
	return {
		basis: state.basis,
		examset: state.examset
	}
}
export default connect(select)(ExamSetTable);
