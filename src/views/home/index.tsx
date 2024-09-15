import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import {Breadcrumb, Layout, Menu, theme} from 'antd';
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


type MenuItem = Required<MenuProps>['items'][number];
import {MenuMapper} from "@/types/common";
const { Header, Content, Footer, Sider } = Layout;


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
        label: "AI助手",
        key: 'chat',
        icon: <GiftFilled />,
        children: [
            {
                label: "AI对话",
                key: '/home/chatConversation',
                icon: <ProjectFilled />
            },
            {
                label: "数据管理",
                key: '/home/chatData',
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
    // {
    //     label: "系统管理",
    //     key: 'system',
    //     icon: <UserOutlined />,
    //     children: [
    //         {
    //             label: "系统设置",
    //             key: '/home/systemSet',
    //             icon: <UserOutlined />
    //         },
    //         {
    //             label: "系统监控",
    //             key: '/home/systemMonitor',
    //             icon: <UserOutlined />
    //         }
    //     ]
    // },
    {
        label: "认证授权",
        key: 'auth',
        icon: <UserOutlined />,
        children: [
            {
                label: "用户列表",
                key: '/home/userList',
                icon: <UserOutlined />
            },
            {
                label: "角色管理",
                key: '/home/roleManage',
                icon: <UserOutlined />
            }
        ]
    }


];


const menuMappers:MenuMapper[] = [
    {
        key: "/home/cashProject",
        items: ["礼金管理","礼金项目"]
    },
    {
        key: "/home/cashItem",
        items: ["礼金管理","礼金明细"]
    },
    {
        key: "/home/chatConversation",
        items: ["AI助手","AI对话"]
    },
    {
        key: "/home/chatData",
        items: ["AI助手","数据管理"]
    },
    {
        key: "/home/planItem",
        items: ["计划管理","待办列表"]
    },
    {
        key: "/home/planSchedule",
        items: ["计划管理","我的日程"]
    },
    {
        key: "/home/financeCategory",
        items: ["财务管理","分类"]
    },
    {
        key: "/home/financeRecord",
        items: ["财务管理","财务流水"]
    },
    {
        key: "/home/financeStatistics",
        items: ["财务管理","财务统计"]
    },
    {
        key: "/home/financePlan",
        items: ["财务管理","财务计划"]
    },
    {
        key: "/home/systemSet",
        items: ["系统管理","系统设置"]
    },
    {
        key: "/home/systemMonitor",
        items: ["系统管理","系统监控"]
    },
    {
        key: "/home/userList",
        items: ["认证授权","用户列表"]
    },
    {
        key: "/home/roleManage",
        items: ["认证授权","角色管理"]
    }
]







const App: React.FC = () => {
    const [openKeys,setOpenKeys] = useState([])
    const [crumbs,setCrumbs] = useState<string[]>([])
    const navigate = useNavigate();
    // 路由当前路由信息
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const changeMenu = (e:{key:string}) => {
        const key = e.key;
        navigate(key);
        menuMappers.forEach(v => {
            if(v.key === key) {
                setCrumbs(v.items)
            }
        })
    }
    const openMenu = (keys: string[]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setOpenKeys([keys[keys.length - 1]])
    }

    // 路由跳转
    const list = crumbs.map((item) =>  <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]}
                      mode="inline"
                      items={items} openKeys={openKeys}
                      onOpenChange={openMenu}
                      onClick={changeMenu} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    {
                        crumbs.length > 0 ?
                            <Breadcrumb  style={{ margin: '16px 16px 0px 16px',lineHeight: '16px'}}>
                                {list}
                            </Breadcrumb>
                            : null
                    }

                </Header>
                <Content style={{ margin: '16px 16px 0px 16px',height: '100%' }}>
                    {/*路由视图*/}
                    <Outlet/>
                </Content>
                <Footer style={{ textAlign: 'center',padding: 0,lineHeight: '48px' }}>
                    <a href={"https://beian.miit.gov.cn/"} style={{color: '#000'}} target="_blank">蜀ICP备2024091450号-1</a>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;