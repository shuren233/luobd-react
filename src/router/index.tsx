import React, { lazy } from "react";
import Login from "@/views/login";
import Register from "@/views/register";

const DefaultLayout = lazy(() => import("@/layout/default"));
const Home = lazy(() => import("@/views/home"));
const User = lazy(() => import("@/views/user"));
const CashProject = lazy(() => import("@/views/cash/project"));
const CashItem = lazy(() => import("@/views/cash/item"));
const ChatConversation = lazy(() => import("@/views/chat/conversation"));
const ChatData = lazy(() => import("@/views/chat/amount"));
const PlanItem = lazy(() => import("@/views/plan/item"));
const PlanSchedule = lazy(() => import("@/views/plan/schedule"));
const FinanceCategory = lazy(() => import("@/views/finance/category"));
const FinanceRecord = lazy(() => import("@/views/finance/record"));
const FinancePlan = lazy(() => import("@/views/finance/plan"));
const FinanceStatistics = lazy(() => import("@/views/finance/statistics"));
const AuthRoles = lazy(() => import("@/views/auth/roles"));
const AuthAccount = lazy(() => import("@/views/auth/account"));
const DynamicForm = lazy(() => import("@/views/form"));

// 重定向组件
import { Navigate } from "react-router-dom";
const router = [
    {
        path: "/",
        // 重定向
        element: <Navigate to={"/home"} />,
    },
    {
        path: "/home",
        name: "home",
        meta: {
            title: "门户信息",
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/home/user",
                name: "home-user",
                meta: {
                    title: "门户信息",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <User />
                    </React.Suspense>
                ),
            },
        ],
    },
    {
        path: "/cash",
        name: "cash",
        meta: {
            title: "礼金管理",
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/cash/cashProject",
                name: "cash-cashProject",
                meta: {
                    title: "礼金项目",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <CashProject />
                    </React.Suspense>
                ),
            },
            {
                path: "/cash/cashItem",
                name: "cash-cashItem",
                meta: {
                    title: "礼金明细",
                    roles: {
                        page: "crashDetail",
                    },
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <CashItem />
                    </React.Suspense>
                ),
            },
        ],
    },
    {
        path: "/chat",
        name: "chat",
        meta: {
            title: "AI助手",
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/chat/chatConversation",
                name: "chat-chatConversation",
                meta: {
                    title: "AI对话",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <ChatConversation />
                    </React.Suspense>
                ),
            },
            {
                path: "/chat/chatData",
                name: "chat-chatData",
                meta: {
                    title: "数据管理",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <ChatData />
                    </React.Suspense>
                ),
            },
        ],
    },
    {
        path: "/plan",
        name: "plan",
        meta: {
            title: "计划管理",
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/plan/planItem",
                name: "plan-planItem",
                meta: {
                    title: "待办列表",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <PlanItem />
                    </React.Suspense>
                ),
            },
            {
                path: "/plan/planSchedule",
                name: "plan-planSchedule",
                meta: {
                    title: "我的日程",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <PlanSchedule />
                    </React.Suspense>
                ),
            },
        ],
    },
    {
        path: "/finance",
        name: "finance",
        meta: {
            title: "财务管理",
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/finance/financeCategory",
                name: "finance-financeCategory",
                meta: {
                    title: "分类管理",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <FinanceCategory />
                    </React.Suspense>
                ),
            },
            {
                path: "/finance/financeRecord",
                name: "finance-financeRecord",
                meta: {
                    title: "财务流水",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <FinanceRecord />
                    </React.Suspense>
                ),
            },
            {
                path: "/finance/financePlan",
                name: "finance-financePlan",
                meta: {
                    title: "计划目标",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <FinancePlan />
                    </React.Suspense>
                ),
            },
            {
                path: "/finance/financeStatistics",
                name: "finance-financeStatistics",
                meta: {
                    title: "财务统计",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <FinanceStatistics />
                    </React.Suspense>
                ),
            },
        ],
    },
    {
        path: "/authorize",
        name: "authorize",
        meta: {
            title: "认证授权",
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/authorize/userList",
                name: "authorize-userList",
                meta: {
                    title: "用户列表",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        {" "}
                        <AuthAccount />{" "}
                    </React.Suspense>
                ),
            },
            {
                path: "/authorize/roleManage",
                name: "authorize-roleManage",
                meta: {
                    title: "角色管理",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        {" "}
                        <AuthRoles />{" "}
                    </React.Suspense>
                ),
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        // 重定向
        element: <Login />,
    },
    {
        path: "/register",
        name: "register",
        // 重定向
        element: <Register />,
    },
    {
        path: "/form",
        name: "form",
        meta: {
            title: "表单",
            roles: {
                page: "form",
            },
        },
        element: <DefaultLayout />,
        children: [
            {
                path: "/form/detail",
                name: "form-detail",
                meta: {
                    title: "详情",
                },
                element: (
                    <React.Suspense fallback={<div>加载中...</div>}>
                        <DynamicForm />
                    </React.Suspense>
                ),
            },
        ],
    },
];
export default router;
