import React, { useState } from 'react';
import {
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {useNavigate} from "react-router-dom";
import {Menu } from 'antd';

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
    const [openKeys,setOpenKeys] = useState([])
    const navigate = useNavigate();

    // 路由跳转
    const changeMenu = (e:{key:string}) => {
        navigate(e.key)
    }
    const openMenu = (keys: string[]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setOpenKeys([keys[keys.length - 1]])
    }
    return (
                <Menu theme="dark" defaultSelectedKeys={['1']}
                      mode="inline"
                      items={items} openKeys={openKeys}
                      onOpenChange={openMenu}
                      onClick={changeMenu} />

    );
};

export default App;