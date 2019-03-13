import React from 'react';
import {Route , Link ,BrowserRouter, Switch , Router ,Redirect} from 'react-router-dom';
import store from './src/reducer/store.jsx';
import asnycLoad from './src/common/asnycLoad.jsx';
import {Provider} from 'react-redux';

//redux监控
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState().get('Items'))
})

//-----页面注册----
const Home = asnycLoad(() => import('./src/page/index.jsx'));

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
                            pathname : '/login',
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
        <div>
            <Route exact path = "/" render = {()=>{
                return <Redirect to = "/data"/>
            }}/>
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