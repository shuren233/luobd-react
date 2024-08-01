import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import { Breadcrumb, Layout,  theme } from 'antd';
import MainMenu from "@/components/MainMenu";
const { Header, Content, Footer, Sider } = Layout;





const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    // 路由跳转

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <MainMenu/>
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