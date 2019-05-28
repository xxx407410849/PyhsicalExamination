import React from 'react';
import { Route, Link, BrowserRouter, Switch, Router, Redirect } from 'react-router-dom';
import store from './src/reducer/store.jsx';
import asnycLoad from './src/common/asnycLoad.jsx';
import { Provider, connect } from 'react-redux';
import { Host } from './src/config/host.jsx';
import fetch from './src/common/fetch.jsx';
import { message } from 'antd';

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
const Visual = asnycLoad(() => import('./src/page/visual/index'));
// const Login = import('./src/page/login/index');
// import Login from './src/page/login/index';

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
    <BrowserRouter>
        <Provider store={store}>
            <div style={{ "height": "100%", "width": "100%" }}>
                <Route path="/" component={Home} />
                <Route exact path="/" component={Login} />
                <Route exact path="/block" component={ErrorPage} />
                <PrivateRoute path="/basis" component={Basis} accessType={["admin"]} />
                <PrivateRoute path="/score" component={Score} accessType={["admin", "teacher"]} />
                <PrivateRoute path="/dataVisual" component={Visual} accessType={["admin", "teacher", "student","airline"]}/>
            </div>
        </Provider>
        {/* <Route path = "/emotionList" component = {Breadcrumb} />
        <Switch>  
            <Route exact path = "/code" component = {Codectncomponent}/>
            <Route exact path = "/checkbox" component = {Checkboxcomponent}/>
            <Route exact path = "/emotionList" component = {Todolistctncomponent} />
            <Route exact path = "/emotionListRedux" component = {AppReduxEntry} />
        </Switch> */}
    </BrowserRouter>
)