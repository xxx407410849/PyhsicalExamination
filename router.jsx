import React from 'react';
import { Route, Link, BrowserRouter, Switch, Router, Redirect,HashRouter } from 'react-router-dom';
import store from './src/reducer/store.jsx';
import asnycLoad from './src/common/asnycLoad.jsx';
import { Provider, connect } from 'react-redux';
import { Host } from './src/config/host.jsx';
import fetch from './src/common/fetch.jsx';
import { message } from 'antd';
// import Home from './src/page/index.jsx';
// import Basis from './src/page/basis/index';
// import Login from './src/page/login/index';
// import Score from './src/page/score/index';
// import ErrorPage from './src/page/error/index';
//redux监控
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

//-----页面注册----
const Home = asnycLoad(() => import('./src/page/index.jsx'));
// const Home = asnycLoad(() => import('./src/page/index.jsx'));
const Basis = asnycLoad(() => import('./src/page/basis/index'));
const Login = asnycLoad(() => import('./src/page/login/index'));
const Score = asnycLoad(() => import('./src/page/score/index'));
const ErrorPage = asnycLoad(() => import('./src/page/error/index'));
// import Login from './src/page/login/index';


class UNDO extends React.Component {
    render(){
        return (
            <div>
                <p>本页面暂时未竣工，此页面为额外附加任务，并不与毕设任务有直接关系</p>
                <p>相关成绩查询在导入成绩页面就可以完全做到,请注意页面上的筛选和排序按钮</p>
                <p>通过学生登录将只能进入该页面</p>
            </div>
        )
    }
}
class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthor: true, //默认登录
            isAuthorType: false //默认无功能权限
        }
    }
    // componentWillMount = async() => {
    //     await this.requireAuth();
    //     console.log(this.props);
    // }
    componentWillMount() {
        // if(this.props.history.location)
    }

    componentWillReceiveProps(nextProps) {
    }

    requireAuth = () => {
        if (location.pathname != "/") {
            if (this.props.home.userName || this.props.login.loginStatus) return true;
            else return false;

        }
        return true;
    }
    // requireAuth = async () => {
    //     let { authorType } = this.props; //功能权限
    //     console.log("authorCheck");
    //     let options = {
    //         url: Host.prodHost.nodeHost + Host.hosts.authorCheck,
    //         method: "GET"
    //     };
    //     let isAuthor = await fetch(options).then((data) => {
    //         if (data.ret) {
    //             return true;
    //         }
    //         else {
    //             message.error("请先登录");
    //             return false;
    //         }
    //     }).catch((err) => {
    //         message.error("请检查网络或服务器崩溃");
    //         return false;
    //     });
    //     this.setState({
    //         isAuthor: isAuthor
    //     })
    // };
    render() {
        const { component: Component, home, login, accessType, ...rest } = this.props;
        let userType = home.type || login.userType;
        return (
            <Route
                {...rest}
                render={props => {
                    if (!home.reloadStatus && !login.loginLoading) return <div>Loading</div>;
                    if (!(home.userName || login.loginStatus))message.warning("请先登录");
                    return (home.userName || login.loginStatus)
                        ? (!accessType || [...accessType].indexOf(userType) != -1 ?
                            <Component {...props} /> :
                            <Redirect
                                to={{
                                    pathname: '/block',
                                    state: { from: props.location }
                                }}
                            />)
                        : (<Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }}
                        />)

                }
                }
            >
            </Route>
        )
    }
}
function select(state) {
    return {
        login: state.login,
        home: state.home
    };
}

PrivateRoute = connect(select, null, null, { pure: false })(PrivateRoute);


// const PrivateRoute = ({ component : Component , ...rest}) => {
//     console.log(requireAuth());
//     return (
//         <Route
//             {...rest}
//             render = {props => 
//                 requireAuth() ? (
//                     <Component {...props}/>
//                 ) : (
//                     <Redirect 
//                         to = {{
//                             pathname : '/',
//                             state: {from: props.location}
//                         }}
//                     />
//                 )
//             }
//         >
//         </Route>
//     )
// }
export default (
    <HashRouter>
        <Provider store={store}>
            <div style={{ "height": "100%", "width": "100%" }}>
                <Route path="/" component={Home} />
                <Route exact path="/" component={Login} />
                <Route exact path="/block" component={ErrorPage} />
                <PrivateRoute path="/basis" component={Basis} accessType={["admin"]} />
                <PrivateRoute path="/score" component={Score} accessType={["admin", "teacher"]} />
                <Route exact path="/dataVisual" component={UNDO} />
            </div>
        </Provider>
        {/* <Route path = "/emotionList" component = {Breadcrumb} />
        <Switch>  
            <Route exact path = "/code" component = {Codectncomponent}/>
            <Route exact path = "/checkbox" component = {Checkboxcomponent}/>
            <Route exact path = "/emotionList" component = {Todolistctncomponent} />
            <Route exact path = "/emotionListRedux" component = {AppReduxEntry} />
        </Switch> */}
    </HashRouter>
) 