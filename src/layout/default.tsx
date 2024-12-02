import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import routes from "@/router";
import type { MenuProps } from "antd";
import LbMenu from "@/components/lbMenu";
import LbHeader from "@/components/lbHeader";
import "./default.scss";

const { Content, Sider } = Layout;

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerHeight: "56px",
                        headerPadding: "0",
                    },
                },
            }}
        >
            <Layout className="default-layout">
                <LbHeader />
                <Layout className="default-sider">
                    <Sider
                        width={200}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <LbMenu menu={routes} />
                    </Sider>
                    <Layout style={{ padding: "24px" }}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
