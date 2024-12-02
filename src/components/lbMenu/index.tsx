import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
// import routes from "@/router"

interface MenuItem {
    path: string;
    icon?: string;
    name?: string;
    isOnly?: boolean;
    meta?: Record<string, any>;
    children?: MenuItem[];
}
interface LbMenuProps {
    menu: MenuItem[];
    selectedKeys: string[];
}
const App: React.FC<LbMenuProps> = ({ menu = [], selectedKeys = [] }) => {
    const navigate = useNavigate();
    // 路由当前路由信息
    const location = useLocation();
    const [openKeys, setSelectedKeys] = useState(selectedKeys);

    useEffect(() => {
        setSelectedKeys([location.pathname]);
    }, [location]);
    const handleMenuClick = (e: {
        key: string;
        keyPath: string[];
        item: React.ReactInstance;
        domEvent: React.MouseEvent | React.KeyboardEvent;
    }) => {
        console.log(e, location, "e@@");
        navigate(e.key);
    };
    return (
        <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={openKeys}
            onClick={handleMenuClick}
        >
            {menu.map((item) => {
                if (item.meta && item.isOnly) {
                    return (
                        <Menu.Item key={item.path}>
                            {item.meta?.title}
                        </Menu.Item>
                    );
                } else {
                    if (item.children && item.children.length) {
                        return (
                            <Menu.SubMenu
                                key={item.path}
                                title={item.meta?.title}
                            >
                                {item.children.map((subItem) => (
                                    <Menu.Item key={subItem.path}>
                                        {subItem.meta?.title}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        );
                    }
                }
            })}
        </Menu>
    );
};

export default App;
