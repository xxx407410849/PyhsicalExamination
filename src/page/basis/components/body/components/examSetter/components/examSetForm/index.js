import { connect } from 'react-redux';
import React from 'react';
import { Form, Select, Icon, message, Input, Button } from 'antd';
import {
    examGet,
    examSet,
    examSetChangeState
} from '../../actions/index';
import './index.less';
var regYear = /^\d{4}/;
var regRound = /^[1-9][0-9]{0,1}$/;
class ExamSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _examSetHandle = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            this.props.dispatch(examSet(value));
        })
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.examset.errMsg != "" && this.props.examset.errMsg != nextProps.examset.errMsg){
            message.error(nextProps.examset.errMsg);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this._examSetHandle} className="examset-form" layout="inline">
                <Form.Item
                    label="考核年份"
                >
                    {getFieldDecorator('year', {
                        initialValue: '2019',
                        rules: [
                            { required: true, message: '年份不能为空' },
                            { pattern: regYear, message: '请输入四位数字' }
                        ]
                    })(
                        <Input addonAfter={<Icon type="schedule" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Year" />
                    )}
                </Form.Item>
                <Form.Item
                    label="次数"
                    style={{ marginLeft: "5px", marginRight: "20px" }}
                >
                    {getFieldDecorator('round', {
                        rules: [
                            { required: true, message: '轮次不能为空' },
                            { pattern: regRound, message: '请输入至多2位首位不为0的数字' }
                        ],
                    })(
                        <Input addonAfter={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Round" />
                    )}
                </Form.Item>
                <Form.Item
                    className="examset-form-bar"
                >
                    <Button type="primary" htmlType="submit" className="examset-form-button">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        )
    }
};
const ExamSetForm = Form.create({ name: "examsetForm" })(ExamSet);

function select(state) {
    return {
        basis: state.basis,
        examset: state.examset
    };
}
export default connect(select)(ExamSetForm);