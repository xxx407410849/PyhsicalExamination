import React from 'react';
import { Form, Icon, Input, Button, Select } from 'antd';
class LoginBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { loginHandle } = this.props;
        return (
            <Form onSubmit={loginHandle} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userType', {
                        rules: [{ required: true, message: '请选择你的用户类型！' }],
                    })(
                        <Select placeholder="用户类型" prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}>
                            <Select.Option value="admin">管理员</Select.Option>
                            <Select.Option value="teacher">老师</Select.Option>
                            <Select.Option value="student">学生</Select.Option>
                        </Select>
                    )
                    }
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: "loginForm" })(LoginBody)
export default LoginForm;