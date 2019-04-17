import React from 'react';

import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

const MenuGroup = () => {
    return (
        <Menu style={{height: '100vh'}} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Icon type="desktop" />
                    <span className="nav-text">Dashboard</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="table" />
                <span className="nav-text">Registrations</span>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="database" />
                <span className="nav-text">Databases</span>
            </Menu.Item>
            <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">My Account</span>
            </Menu.Item>
            <Menu.Item key="5">
                <Icon type="setting" />
                <span className="nav-text">Settings</span>
            </Menu.Item>
        </Menu>
    );
};

export default MenuGroup;