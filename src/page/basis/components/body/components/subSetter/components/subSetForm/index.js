import React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Button, Radio, Icon, message, Popconfirm } from 'antd';
import {
    getClassName,
    setSub
} from '../../actions/index';
import './index.less';
let radioSet = {
    "男子35岁以上": {
        "科目二": ["引体向上", "50kg卧推"],
        "科目五": ["前抛实心球", "25kg杠铃快挺"]
    },
    "男子35岁以下": {
        "科目二": ["引体向上", "双杠臂屈伸", "50kg卧推"],
        "科目四": ["三级蛙跳", "T形跑", "100米跑", "25米折返跑"],
        "科目六": ["90kg杠铃硬拉", "负重折返", "25kg杠铃快挺"]
    },
    "女子35岁以上": {
        "科目二": ["跪姿俯卧撑", "25kg卧推"],
        "科目五": ["前抛实心球", "15kg杠铃快挺"]
    },
    "女子35岁以下": {
        "科目二": ["跪姿俯卧撑", "25kg卧推"],
        "科目四": ["立定跳远", "T形跑", "100米跑", "25米折返跑"],
        "科目六": ["40kg杠铃硬拉", "前抛实心球", "15kg杠铃快挺"]
    }
};
class SubSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioSetProd: "",
            selectValue: "",
            confirmVisable: false
        }
    }
    componentDidMount() {
        this.props.dispatch(getClassName());
    }
    componentWillReceiveProps(nextProps) {
        // if(nextProps.subset.setStatus){
        //     //这里只会在成功set后触发，清除所有选择
        // }
    }
    confirmShow = (visiable) => {
        if (!visiable) {
            this.setState({
                confirmVisable: visiable
            });
            return;
        }
        else {
            this.setState({
                confirmVisable: visiable
            })
        }
    };
    submitHandle = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                console.log(err);
                return;
            }
            let newObject = {};
            for (const key in value) {
                if (value.hasOwnProperty(key) && key.indexOf("_") != -1) {
                    newObject[(key.split("_")[1])] = value[key];
                }
            }
            let data = {
                class: value.class,
                sub: newObject
            }
            this.props.dispatch(setSub(data, this.setSubSucCallBack));
        })
    };
    setSubSucCallBack = () => {
        this.props.form.setFieldsValue({ "class": "" });
        this.setState({
            radioSetProd: "",
            selectValue: ""
        });
        message.success("设置成功", 1.5);
    }
    selectHandle = (value) => {
        let key = value.slice(-2);
        let radioSetProd = "";
        switch (key) {
            case "UM":
                radioSetProd = "男子35岁以上"
                break;
            case "DM":
                radioSetProd = "男子35岁以下"
                break;
            case "UF":
                radioSetProd = "女子35岁以上"
                break;
            case "DF":
                radioSetProd = "女子35岁以下"
                break;
        }
        this.setState({
            radioSetProd: radioSetProd,
            selectValue: value
        })
    };
    renderRadio = () => {
        const { getFieldDecorator } = this.props.form;
        let object = radioSet[this.state.radioSetProd];
        let newArray = [];
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                newArray.push(
                    <Form.Item
                        label={`${this.state.radioSetProd}${key}`}
                        key={`${this.state.selectValue}${key}`}
                    >
                        {
                            getFieldDecorator(`${this.state.selectValue}_${key}`, {
                                rules: [
                                    { required: true, message: '科目不能为空' }
                                ]
                            })(
                                <Radio.Group name="subradio">
                                    {
                                        object[key].map((item, idx) => {
                                            return <Radio value={item} key={`${item}`}>{item}</Radio>
                                        })
                                    }
                                </Radio.Group>
                            )
                        }
                    </Form.Item >
                )
            }
        }
        return (
            newArray.map((item, idx) => {
                return item;
            })
        )
    };
    renderTipsDiv = () => {
        return (
            <div className="subset-form-tips">
                <Icon type="coffee" style={{ display: "block", fontSize: "36px", marginBottom: "10px" }} />
                <p>请在上方选择需要设置的批次班级</p>
            </div>
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { nameData } = this.props.subset;
        return (
            <Form className="subset-form" >
                <div className="subset-form-header">
                    <Form.Item
                        label="请选择班级名称"
                    >
                        {getFieldDecorator('class', {
                            rules: [
                                { required: true, message: '班级不能为空' }
                            ]
                        })(
                            <Select
                                className="subset-form-select"
                                onChange={this.selectHandle}
                                placeholder="请选择班级批次"
                            >
                                {
                                    nameData.map((item) => {
                                        return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                </div>
                <div className="subset-form-body">
                    {
                        this.state.radioSetProd ? this.renderRadio() : this.renderTipsDiv()
                    }
                    {/* <Form.Item
                    label="男子35岁以上复训科目三"
                >
                    {getFieldDecorator('subject_3', {
                        rules: [
                            { required: true, message: '科目不能为空' },
                        ]
                    })(
                        <Radio.Group name="subradio">
                            <Radio value={"a"}>a</Radio>
                            <Radio value={"b"}>b</Radio>
                            <Radio value={"c"}>c</Radio>
                        </Radio.Group>
                    )}
                </Form.Item> */}
                    {
                        this.state.radioSetProd ?
                            <Form.Item
                                className="subset-form-bar"
                            >
                                <Popconfirm
                                    title="确认要选择这些科目?确认后将锁定批次且无法更改!!"
                                    okText="确定"
                                    cancelText="取消"
                                    visible={this.state.confirmVisable}
                                    onVisibleChange={this.confirmShow}
                                    onConfirm={this.submitHandle}
                                >
                                    <Button type="danger" htmlType="submit" className="subset-form-button">
                                        确定
                                    </Button>
                                </Popconfirm>
                            </Form.Item>
                            :
                            ""
                    }
                </div>
            </Form>
        )
    }
}
const SubSetForm = Form.create({ name: "subSetForm" })(SubSet);
function select(state) {
    return {
        subset: state.subset
    }
}
export default connect(select)(SubSetForm);