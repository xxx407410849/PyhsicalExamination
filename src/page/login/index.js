import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Select } from 'antd';
import { login } from './action/index';
import fetch from '../../common/fetch.jsx';
import './index.less';
import { Host } from '../../config/host.jsx';
import md5 from 'js-md5';
//校验规则
const regusername = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,14}/;
const regpassword = /[a-zA-Z0-9^%&';=?$x22]{8,}/;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5, offset: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10, offset: 1 },
    },
};
class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // let options = {
        //     url: Host.prodHost.nodeHost + Host.hosts.login,
        //     data: {
        //         userName: "llll",
        //         passWord: "lllll"
        //     }
        // }
        // fetch(options).then((data) => {
        //     console.log(data);
        // })
        //     .catch(() => {

        //     });
    }
    _loginHandle = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                console.log(value);
            }
            let passWord = md5(value.passWord);
            this.props.dispatch(login(value.userName, passWord, value.type));
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-body-ctn">
                <Form onSubmit={this._loginHandle} className="login-form">
                    <Form.Item
                        label="用户类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('type',{
                            initialValue: 'admin'
                        })(
                            <Select
                                prefix={<Icon type="team"
                                    style={{ color: "rgba(0,0,0,.25)" }} />}
                            >
                                <Select.Option value="admin">管理员</Select.Option>
                                <Select.Option value="teacher">老师</Select.Option>
                                <Select.Option value="student">学生</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="用户名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '用户名不能为空' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="用户密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('passWord', {
                            rules: [
                                { required: true, message: '密码不能为空' },
                                { pattern: regpassword, message: '密码非法，请输入8位及以上非汉字密码' }
                            ],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        className="login-form-bar"
                    >
                        <a className="login-form-forgot" href="">忘记密码？</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const LoginForm = Form.create({ name: "loginForm" })(Login)

function select(state) {
    return {
        home: state.home,
        login: state.login
    };
}

export default connect(select)(LoginForm);