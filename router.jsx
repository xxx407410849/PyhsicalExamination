import React from 'react';
import {Route , Link ,BrowserRouter, Switch , Router ,Redirect} from 'react-router-dom';
import store from './src/reducer/store.jsx';
import asnycLoad from './src/common/asnycLoad.jsx';
import {Provider} from 'react-redux';

//redux监控
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})

//-----页面注册----
const Global = asnycLoad(() => import('./src/global/index.js'));
const Home = asnycLoad(() => import('./src/page/index.jsx'));
const Login = asnycLoad(() => import('./src/page/login/index'));

const requireAuth = () => {
    
}
const PrivateRoute = ({ component : Component , ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props => 
                true ? (
                    <Component {...props}/>
                ) : (
                    <Redirect 
                        to = {{
                            pathname : '/',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        >
        </Route>
    )
}
export default (
    <BrowserRouter>
        <Provider store = {store}>
        <div style = {{"height" : "100%" , "width" : "100%"}}>
            <Route path = "/" component = {Global}/>
            <Route exact path = "/" component = {Login}/>
            <PrivateRoute path = "/data" component = {Home}/>
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