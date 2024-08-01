import React, { useState } from 'react';
import {
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {useNavigate} from "react-router-dom";
import {Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
    {
        label: "门户信息",
        key: '/home/portal',
        icon: <UserOutlined />
    },
    {
        label: "礼金管理",
        key: 'cash',
        icon: <UserOutlined />,
        children: [
            {
                label: "礼金项目",
                key: '/home/cashProject',
                icon: <UserOutlined />
            },
            {
                label: "礼金明细",
                key: '/home/cashItem',
                icon: <UserOutlined />
            },
        ]
    },
    {
        label: "计划管理",
        key: 'plan',
        icon: <UserOutlined />,
        children: [
            {
                label: "待办列表",
                key: '/home/planItem',
                icon: <UserOutlined />
            },
            {
                label: "我的日程",
                key: '/home/planSchedule',
                icon: <UserOutlined />
            },
        ]
    },
    {
        label: "财务管理",
        key: 'finance',
        icon: <UserOutlined />,
        children: [
            {
                label: "分类管理",
                key: '/home/financeCategory',
                icon: <UserOutlined />
            },
            {
                label: "财务流水",
                key: '/home/financeRecord',
                icon: <UserOutlined />
            },
            {
                label: "计划目标",
                key: '/home/financePlan',
                icon: <UserOutlined />
            },
            {
                label: "财务统计",
                key: '/home/financeStatistics',
                icon: <UserOutlined />
            },
        ]
    },
    {
        label: "系统管理",
        key: 'system',
        icon: <UserOutlined />,
        children: [
            {
                label: "系统设置",
                key: '/home/systemSet',
                icon: <UserOutlined />
            },
            {
                label: "系统监控",
                key: '/home/financeRecord',
                icon: <UserOutlined />
            }
        ]
    },

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