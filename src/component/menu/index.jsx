import React from 'react';
import { Menu, Icon } from 'antd';
import './index.less';
import Divider from '../../pureComponent/divider/index.jsx';
import LogoDiv from '../logoDiv/index.jsx';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


// renderItemGroup = (item) => {
//     return [
//         <MenuItemGroup
//             key = {item.key}
//             title = {item.key}
//         >
//             {
//                 item.renderData.map((val)=>{
//                     return (
//                         <Menu.Item key = {val.key}>
//                             {val.key}
//                         </Menu.Item>
//                     )
//                 }) 
//             }
//         </MenuItemGroup>
//     ]
// }
class SlideMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    renderSubTitle = (iconType,Text,extraClass) => {
        return (
            <span className = {extraClass + " menu-sub-title"}>
                <Icon type = {iconType} className = {extraClass}/>
                <span>{Text}</span>
            </span>
        )
    }
    render(){
        return (
            <div className = "slideMenu">
                <Divider extraClass = " sliderMenu-divider"/>
                <Menu
                    mode = "inline"
                    style = {{width : 256 , border : "none"}}
                    openKeys = {this.props.menuOpenKey}
                    selectedKeys = {this.props.menuSelectedKey}
                    onClick = {this.props.menuClickHandle}
                    onOpenChange = {this.props.menuOpenHandle}
                >
                    <Menu.Item
                        key = "数值筛选设置"
                    >
                        {this.renderSubTitle("setting","数值筛选设置","menu-sub-title-setting")}
                    </Menu.Item>
                    <Menu.Item
                        key = "查询数据"
                    >
                        {this.renderSubTitle("eye","查询数据","menu-sub-title-search")}
                    </Menu.Item>
                    <SubMenu 
                        key = "Insert"
                        title = {this.renderSubTitle("database","批量录入数据","menu-sub-title-insert")}
                    >
                        <Menu.Item
                            key = "ageInsert"
                        >
                            {this.renderSubTitle("team","按年级录入","menu-sub-title-age")}
                        </Menu.Item>
                        <Menu.Item
                            key = "classInsert"
                        >
                            {this.renderSubTitle("user","按班级录入","menu-sub-title-class")}
                        </Menu.Item>
                        <Menu.Item
                            key = "majorInsert"
                        >
                            {this.renderSubTitle("reconciliation","按专业录入","menu-sub-title-product")}
                        </Menu.Item>
                        <Menu.Item
                            key = "projectInsert"
                        >
                            {this.renderSubTitle("solution","按项目录入","menu-sub-title-project")}
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key = "change"
                        title = {this.renderSubTitle("file-text","数据变更","menu-sub-title-change")}
                    >
                        <Menu.Item
                            key = "changeObject"
                        >
                            {this.renderSubTitle("usergroup-add","变更项目/班级/年级/专业","menu-sub-title-changeObject")}
                        </Menu.Item>
                        <Menu.Item
                            key = "changeItem"
                        >
                            {this.renderSubTitle("user-add","变更体能数据/学生数据","menu-sub-title-changeItem")}
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                <Divider extraClass = " sliderMenu-divider"/>
                <LogoDiv />
            </div>
        )
    }
}

export default SlideMenu;