import React, { Component } from 'react';
import Drawer from 'rc-drawer';

import { Layout } from 'antd';

import MenuGroup from './MenuGroup';

import { isMobileOnly, isTablet } from 'react-device-detect';

import 'rc-drawer/assets/index.css';

const { Sider } = Layout;

class NavBar extends Component {

    render(){
        if(isMobileOnly) {
            return (
                <Drawer
                    placement="right"
                    width="75%"
                    height="100vh"
                >
                    <MenuGroup />
                </Drawer>
            )
        } else if(isTablet){
            return (
                <Drawer
                    placement="right"
                    width="50%"
                    height="100vh"
                >
                    <MenuGroup />
                </Drawer>)
        } else {
            return (
                <Sider
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    style={{zIndex: 1, position: 'fixed', height: '100vh'}}
                >
                    <MenuGroup />
                </Sider>
            );
        }
    }
}

export default NavBar;