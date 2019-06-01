import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Select , message} from 'antd';
import { login, relogin, changeCode } from './action/index';
import fetch from '../../common/fetch.jsx';
import Utils from '../../common/utils.jsx';
import './index.less';
import { Host } from '../../config/host.jsx';
import md5 from 'js-md5';
import { Redirect } from 'react-router-dom';
//校验规则
const regusername = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,14}/;
const regpassword = /[a-zA-Z0-9^%&';=?$x22]{3,}/;
//布局方式
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
        this.state = {
            pageStatus: 0, //转换login模式和修改密码模式
            feedBackMsg: "" //默认没有feedback
        }
        this.isRelogin = false; //默认不是自动登录
        this.isTryLogin = false; //默认从未有登录过
        if(Utils.urlParse().changeCode === "1"){
            this.changeCodeStatus = true; //验证是否是从url进入的修改密码模式
            this.state.pageStatus = 1;
        }

    }
    //表单转换
    changeCodeClickHandle = (e) => {
        if(this.timer)return;
        e.preventDefault();
        if (this.state.pageStatus === 1) {
            this.setState({
                pageStatus: 0
            })
        } else {
            this.setState({
                pageStatus: 1
            })
        }
    }
    componentDidMount() {
        console.log(this.props);
        // console.log(this.props.location.state.from);
        if (this.props.login.loginUser) {
            message.warning("您已登录，若需切换用户请先注销");
            if(this.props.login.userType === "admin"){
                this.props.history.replace('/basis');
            }else if(this.props.login.userType === "teacher"){
                this.props.history.replace('/score');
            }else{
                this.props.history.replace('/dataVisual');
            }
        }
        if (this.props.home.userName != "" && !this.changeCodeStatus) {
            this.props.dispatch(relogin(this.props.home.userName, this.props.home.type));
            message.warning("您已登录，若需切换用户请先注销");
            this.isRelogin = true;
            if(this.props.home.type === "admin"){
                this.props.history.replace('/basis');
            }else if(this.props.home.type === "teacher"){
                this.props.history.replace('/score');
            }else{
                this.props.history.replace('/dataVisual');
            }
        }
    }
    componentWillUnmount(){
        if(this.timer)clearTimeout(this.timer);
    }
    componentWillReceiveProps(nextProps){
        let loginState = nextProps.login;
        if (nextProps.home.userName != "" && !this.changeCodeStatus) {
            message.warning("您已登录，若需切换用户请先注销");
            this.isRelogin = true;
            if(nextProps.home.type === "admin"){
                this.props.history.replace('/basis');
            }else if(nextProps.home.type === "teacher"){
                this.props.history.replace('/score');
            }else{
                this.props.history.replace('/dataVisual');
            }
        }
        if(loginState.loginLoading){
            if(loginState.loginStatus){
                if(this.timer)return;
                if(this.isRelogin)return;
                if(this.changeCodeStatus) return;
                message.success("登录成功，3秒后跳转页面");
                this.timer = setTimeout(()=>{
                    if(nextProps.login.userType === "admin"){
                        //location.pathname = '/basis';
                        this.props.history.push('/basis');
                    }else if(nextProps.login.userType === "teacher"){
                        this.props.history.push('/score');
                    }else{
                        this.props.history.push('/dataVisual');
                    }
                },3000);
            }else{
                if(this.isTryLogin)return;
                message.error(nextProps.login.errorMsg);
                this.isTryLogin = true; //避免重复提示
            }
        }
    }
    _loginHandle = (e) => {
        if(this.timer)return;
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            let passWord = md5(value.passWord);
            this.props.dispatch(login(value.userName, passWord, value.type));
            this.isTryLogin = false;
        })
    };
    _changeCodeHandle = (e) => {
        if(this.timer)return;
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            let passWord = md5(value.passWord);
            let passWordF = md5(value.newPassWordF);
            let passWordS = md5(value.newPassWordS);
            this.props.dispatch(changeCode(value.userName, value.type, passWord, passWordF, passWordS));
        })
    };
    compareToFirstCode = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value != form.getFieldValue("newPassWordF")) {
            callback("两次新密码输入不一致，请检查输入");
        } else {
            callback();
        }
    };
    compareToSecondCode = (rule, value, callback) => {
        const form = this.props.form;
        if (value && form.getFieldValue("newPassWordS") && value != form.getFieldValue("newPassWordS")) {
            callback("两次密码输入不一致，请检查输入");
        } else {
            callback();
        }
    }
    //渲染修改密码表单
    renderChangeCodeForm = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this._changeCodeHandle} className="changeCode-form">
                <Form.Item
                    label="用户类型"
                    {...formItemLayout}
                >
                    {getFieldDecorator('type', {
                        initialValue: 'admin'
                    })(
                        <Select
                            prefix={<Icon type="team"
                                style={{ color: "rgba(0,0,0,.25)" }} />}
                        >
                            <Select.Option value="admin">管理员</Select.Option>
                            <Select.Option value="teacher">老师</Select.Option>
                            <Select.Option value="student">学生</Select.Option>
                            <Select.Option value="airline">航空公司</Select.Option>
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
                            { pattern: regpassword, message: '密码非法，请输入3位及以上非汉字密码' }
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item
                    label="新密码"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('newPassWordF', {
                            rules: [
                                { required: true, message: '新密码不能为空' },
                                { pattern: regpassword, message: '密码非法，请输入3位及以上非汉字密码' },
                                { validator: this.compareToSecondCode }
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="PasswordFirst" />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label="重复输入新密码"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('newPassWordS', {
                            rules: [
                                { required: true, message: '密码不能为空' },
                                { pattern: regpassword, message: '密码非法，请输入3位及以上非汉字密码' },
                                { validator: this.compareToFirstCode }
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="PasswordSecond" />
                        )
                    }
                </Form.Item>
                <Form.Item
                    className="login-form-bar"
                >
                    {this.changeCodeStatus ? null : <a className="login-form-forgot" onClick={this.changeCodeClickHandle}>回去登录？</a>}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        )
    };
    //渲染登陆表单
    renderLoginForm = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this._loginHandle} className="login-form">
                <Form.Item
                    label="用户类型"
                    {...formItemLayout}
                >
                    {getFieldDecorator('type', {
                        initialValue: 'admin'
                    })(
                        <Select
                            prefix={<Icon type="team"
                                style={{ color: "rgba(0,0,0,.25)" }} />}
                        >
                            <Select.Option value="admin">管理员</Select.Option>
                            <Select.Option value="teacher">老师</Select.Option>
                            <Select.Option value="student">学生</Select.Option>
                            <Select.Option value="airline">航空公司</Select.Option>
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
                            { pattern: regpassword, message: '密码非法，请输入3位及以上非汉字密码' }
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item
                    className="login-form-bar"
                >
                    <a className="login-form-forgot" onClick={this.changeCodeClickHandle}>修改密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                </Button>
                </Form.Item>
            </Form>
        )
    }
    render() {
        return (
            <div className="login-body-ctn">
                {
                    this.state.pageStatus === 0 ?
                        this.renderLoginForm() : this.renderChangeCodeForm()
                }
            </div>
        )
    }
}

const LoginForm = Form.create({ name: "loginForm" })(Login)

function select(state) {
    return {
        login: state.login,
        home: state.home
    };
}

export default connect(select)(LoginForm);