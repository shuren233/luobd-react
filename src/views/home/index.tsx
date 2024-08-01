import React, { useState } from 'react';
import {
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Outlet,useNavigate} from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('礼金管理', 'sub1', <UserOutlined />, [
        getItem('礼金项目', '/home/user'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('计划管理', 'sub2', <TeamOutlined />,
        [getItem('Team 1', '6'),
            getItem('Team 2', '8')]),
    getItem('记账管理', 'sub3', <TeamOutlined />,
        [getItem('Team 1', '9'),
            getItem('Team 2', '10')]),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    // 路由跳转
    const changeMenu = (e:{key:string}) => {
        navigate(e.key)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}   onClick={changeMenu} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <Breadcrumb style={{ margin: '16px 16px 0px 16px',lineHeight: '16px'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '16px 16px 0px 16px',height: '100%' }}>
                    {/*路由视图*/}
                    <Outlet/>
                </Content>
                <Footer style={{ textAlign: 'center',padding: 0,lineHeight: '48px' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;