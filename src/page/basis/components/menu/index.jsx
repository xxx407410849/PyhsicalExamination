import React from 'react';
import { Menu, Icon } from 'antd';
import './index.less';
import Divider from '../../../../pureComponent/divider/index.jsx';

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
class SlideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderSubTitle = (iconType, Text, extraClass) => {
        return (
            <span className={extraClass + " menu-sub-title"}>
                <Icon type={iconType} className={extraClass} />
                <span>{Text}</span>
            </span>
        )
    }
    render() {
        return (
            <div className="slideMenu">
                <Divider extraClass=" sliderMenu-divider" />
                <Menu
                    mode="inline"
                    style={{ width: 256, border: "none" }}
                    openKeys={this.props.menuOpenKey}
                    selectedKeys={this.props.menuSelectedKey}
                    onClick={this.props.menuClickHandle}
                    onOpenChange={this.props.menuOpenHandle}
                >
                    <Menu.Item
                        key="examDate"
                    >
                        {this.renderSubTitle("setting", "体能考核时间设置", "menu-sub-title-dateset")}
                    </Menu.Item>
                    <Menu.Item
                        key="subInfo"
                    >
                        {this.renderSubTitle("calculator", "体能考核科目信息设置", "menu-sub-title-subset")}
                    </Menu.Item>
                    <SubMenu
                        key="personSetting"
                        title={this.renderSubTitle("database", "考核相关人员设置", "menu-sub-title-personset")}
                    >
                        <Menu.Item
                            key="teacherSet"
                        >
                            {this.renderSubTitle("reconciliation", "考官信息设置", "menu-sub-title-teacherset")}
                        </Menu.Item>
                        <Menu.Item
                            key="classInsert"
                        >
                            {this.renderSubTitle("solution", "考生信息设置", "menu-sub-title-studentset")}
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="infoCheck"
                    >
                        {this.renderSubTitle("file-text", "体能考核名单信息总览", "menu-sub-title-infoCheck")}
                    </Menu.Item>
                </Menu>
                <Divider extraClass=" sliderMenu-divider" />
                {/* <LogoDiv /> */}
            </div>
        )
    }
}

export default SlideMenu;