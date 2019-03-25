//----页面和路由的根文件----
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import App from './public/reducer/TodoListReducer.jsx';
import Immutable from 'immutable';
import Utils from './src/common/utils.jsx';
import router from './router.jsx';
require('velocity-animate');
require('velocity-animate/velocity.ui');

import './root.less';
//热更新配置
if(module.hot){
    module.hot.accept();
}
// import './public/less/index.less';

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
//     loading: MyLoaimport Utils from './src/common/utils';

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
                <li><Link to = "/data">code</Link></li>
                <li><Link to = "/checkbox">checkbox</Link></li>
                <li><Link to = "/emotionList">Emotion</Link></li>
                <li><Link to = "/emotionListRedux">Emotion-redux</Link></li>
            </ul>
            </div>
        )
    }
}

ReactDOM.render(
    router,
    document.getElementById('reactRoot')
)