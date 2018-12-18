//----页面和路由的根文件----
import React from 'react';
import ReactDOM from 'react-dom';
import {Route , Link ,BrowserRouter, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './src/reducer/store.jsx';
// import App from './public/reducer/TodoListReducer.jsx';
import asnycLoad from './src/common/asnycLoad.jsx';
import Immutable from 'immutable';
require('velocity-animate');
require('velocity-animate/velocity.ui');


// import './public/less/index.less';

//-----页面注册----
const Home = asnycLoad(() => import('./src/page/index.jsx'));

//redux监控
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState().get('Items'))
})

// const Codectncomponent = Loadable({
//     loader: () => import('./public/js/passwordModel.jsx'),
//     loading: MyLoadingComponent
// })
// const Checkboxcomponent = Loadable({
//     loader: () => import('./public/js/checkbox.jsx'),
//     loading: MyLoadingComponent
// })
// const Todolistctncomponent = Loadable({
//     loader: () => import('./public/js/Todolist.jsx'),
//     loading: MyLoadingComponent
// })

// const Breadcrumbcomponet = Loadable({
//     loader: () => import('./public/js/Breadcrumb.jsx'),
//     loading: MyLoadingComponent
// })

// const Appcomponent = Loadable({
//     loader: () => import('./public/entry/TodoListAppEntry.jsx'),
//     loading: MyLoadingComponent
// })

class AppReduxEntry extends React.Component{
    render(){
        return (
        <Provider store = {store}>
            <Appcomponent />
        </Provider>
        )
    }
}

class Breadcrumb extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let Breadcrumboption = Immutable.fromJS([{
            name : 'Emotioncontrol',
            link : '/emotionList',
            state : null
        },{
            name : 'caculate',
            link : '/emotionList/caculate',
            state : null
        }]);
        return (
            <Breadcrumbcomponet Itemlist = {Breadcrumboption} />
        )
    }
}

class Demolist extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h1>Demolist</h1>
            <ul>
                <li><Link to = "/code">code</Link></li>
                <li><Link to = "/checkbox">checkbox</Link></li>
                <li><Link to = "/emotionList">Emotion</Link></li>
                <li><Link to = "/emotionListRedux">Emotion-redux</Link></li>
            </ul>
            </div>
        )
    }
}


ReactDOM.render(
    <BrowserRouter basename = "/dist/view/index.html">
        <Provider store = {store}>
            <Route path = "/" component = {Home} />
        </Provider>
        {/* <Route path = "/emotionList" component = {Breadcrumb} />
        <Switch>  
            <Route exact path = "/code" component = {Codectncomponent}/>
            <Route exact path = "/checkbox" component = {Checkboxcomponent}/>
            <Route exact path = "/emotionList" component = {Todolistctncomponent} />
            <Route exact path = "/emotionListRedux" component = {AppReduxEntry} />
        </Switch> */}
    </BrowserRouter>,
    document.getElementById('reactRoot')
)