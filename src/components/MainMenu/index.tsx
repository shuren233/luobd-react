import React, {useEffect, useState} from 'react';
import {
    UserOutlined,
    GiftFilled,
    ProjectFilled,
    OrderedListOutlined,
    SolutionOutlined,
    ScheduleFilled,
    DollarCircleOutlined,
    BlockOutlined,
    UnorderedListOutlined,
    AlertFilled,
    BarChartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {useNavigate,useLocation} from "react-router-dom";
import {Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
    {
        label: "门户信息",
        key: '/home/user',
        icon: <UserOutlined />
    },
    {
        label: "礼金管理",
        key: 'cash',
        icon: <GiftFilled />,
        children: [
            {
                label: "礼金项目",
                key: '/home/cashProject',
                icon: <ProjectFilled />
            },
            {
                label: "礼金明细",
                key: '/home/cashItem',
                icon: <OrderedListOutlined />
            },
        ]
    },
    {
        label: "计划管理",
        key: 'plan',
        icon: <SolutionOutlined />,
        children: [
            {
                label: "待办列表",
                key: '/home/planItem',
                icon: <OrderedListOutlined />
            },
            {
                label: "我的日程",
                key: '/home/planSchedule',
                icon: <ScheduleFilled />
            },
        ]
    },
    {
        label: "财务管理",
        key: 'finance',
        icon: <DollarCircleOutlined />,
        children: [
            {
                label: "分类管理",
                key: '/home/financeCategory',
                icon: <BlockOutlined />
            },
            {
                label: "财务流水",
                key: '/home/financeRecord',
                icon: <UnorderedListOutlined />
            },
            {
                label: "计划目标",
                key: '/home/financePlan',
                icon: <AlertFilled />
            },
            {
                label: "财务统计",
                key: '/home/financeStatistics',
                icon: <BarChartOutlined />
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
    // 路由当前路由信息
    const location = useLocation();


    useEffect(() => {

        setFirstOpenKey();

    })



    const setFirstOpenKey = () => {
        const path = location.pathname;
        console.log("匹配首个打开key值" + path)
        // if(path && path !== '') {
        //     for (let i = 0; i < items.length; i++) {
        //         const plan =  items[i]
        //         if(plan?.children) {
        //             plan.children.forEach(v => {
        //                 if(v.key === path) {
        //                     console.log('找到路由');
        //                     setOpenKeys([plan.key])
        //                 }
        //             })
        //         }
        //     }
        // }
    }






    // 路由跳转
    const changeMenu = (e:{key:string}) => {
        navigate(e.key);
    }
    const openMenu = (keys: string[]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setOpenKeys([keys[keys.length - 1]])
    }
    return (
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]}
                      mode="inline"
                      items={items} openKeys={openKeys}
                      onOpenChange={openMenu}
                      onClick={changeMenu} />
    );
};

export default App;