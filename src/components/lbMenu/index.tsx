import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
// import routes from "@/router"

interface MenuItem {
    path: string;
    icon?: string;
    name?: string;
    onlyOne?: boolean;
    meta?: Record<string, any>;
    children?: MenuItem[];
}
interface LbMenuProps {
    menu: MenuItem[];
}

const userpermissions = ["admin", "form", "crashDetail"];
const App: React.FC<LbMenuProps> = ({ menu = [] }) => {
    const navigate = useNavigate();
    // 路由当前路由信息
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState([menu[0].path]);
    const [selectedKeys, setSelectedKeys] = useState([] as string[]);
    const [permissionRoutes, setPermissionRoutes] = useState([] as MenuItem[]);
    const handleMenuClick = (key: string) => {
        navigate(key);
    };
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys([keys[keys.length - 1]]);
    };

    const hasPermission = (roles: string[], route: Record<string, any>) => {
        if (route.meta && route.meta.roles && route.meta.roles.page) {
            return roles.some((role) => route.meta.roles.page === role);
        } else {
            return true;
        }
    };

    const filterRoutes = (routes: MenuItem[], roles: string[]) => {
        if (!roles.length) {
            return routes;
        }
        const res = [] as MenuItem[];
        routes.forEach((route) => {
            const tmp = { ...route };
            if (hasPermission(roles, tmp)) {
                if (tmp.children) {
                    tmp.children = filterRoutes(tmp.children, roles);
                }
                res.push(tmp);
            }
        });
        return res;
    };

    const getPermissionRoutes = () => {
        const allRoutes = JSON.parse(JSON.stringify(menu));
        return filterRoutes(allRoutes, userpermissions);
    };

    const resetMenu = () => {
        setPermissionRoutes(getPermissionRoutes());
    };

    useEffect(() => {
        setSelectedKeys([location.pathname]);
    }, [location.pathname]);

    useEffect(() => {
        resetMenu();
    }, [menu]);

    useEffect(() => {
        const tempRoutes = getPermissionRoutes();
        // 页面刷新拿到当前路由，拿到当前路由后去匹配
        const currentPath = location.pathname;
        if (currentPath === "/") {
            setOpenKeys(["/home"]);
            return;
        }
        const getPerentPaths = (
            routes: MenuItem[],
            currentPath: string,
            parentPaths: string[] = []
        ): string[] => {
            for (const item of routes) {
                if (item.path === currentPath) {
                    return [...parentPaths, item.path];
                }
                if (item.children && item.children.length) {
                    const result = getPerentPaths(item.children, currentPath, [
                        ...parentPaths,
                        item.path,
                    ]);
                    if (result.length > 0) {
                        return result;
                    }
                }
            }
            return [];
        };
        const perentPaths = getPerentPaths(tempRoutes, currentPath);

        setOpenKeys(perentPaths);
    }, []);

    return (
        <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={handleOpenChange}
        >
            {permissionRoutes.map((item) => {
                if (item.meta && item.meta.onlyOne) {
                    return (
                        <Menu.Item
                            key={item.path}
                            onClick={() => handleMenuClick(item.path)}
                        >
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
                                    <Menu.Item
                                        key={subItem.path}
                                        onClick={() =>
                                            handleMenuClick(subItem.path)
                                        }
                                    >
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
