
import React,{lazy} from "react";
import Login from '@/views/login'
const Home = lazy(() => import('@/views/home'))
const User = lazy(() => import('@/views/user'))
const CashProject = lazy(() => import('@/views/cash/project'))
const CashItem = lazy(() => import('@/views/cash/item'))
const ChatConversation = lazy(() => import('@/views/chat/conversation'))
const ChatData = lazy(() => import('@/views/chat/amount'))
const PlanItem = lazy(() => import('@/views/plan/item'))
const PlanSchedule = lazy(() => import('@/views/plan/schedule'))
const FinanceCategory = lazy(() => import('@/views/finance/category'))
const FinanceRecord = lazy(() => import('@/views/finance/record'))
const FinancePlan = lazy(() => import('@/views/finance/plan'))
const FinanceStatistics = lazy(() => import('@/views/finance/statistics'))
const AuthRoles = lazy(() => import('@/views/auth/roles'))
const AuthAccount = lazy(() => import('@/views/auth/account'))

// 重定向组件
import {Navigate} from "react-router-dom";
const router = [
    {
        path: '/',
        // 重定向
        element: <Navigate to={'/home'} />
    },
    {
        path: '/home',
        element: <React.Suspense fallback={<div>加载中...</div>}>
            <Home />
        </React.Suspense>,
        children: [
            {
                path: '/home/user',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <User />
                </React.Suspense>
            },
            {
                path: '/home/cashProject',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <CashProject />
                </React.Suspense>
            },
            {
                path: '/home/cashItem',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <CashItem />
                </React.Suspense>
            },
            {
                path: '/home/chatConversation',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <ChatConversation />
                </React.Suspense>
            },
            {
                path: '/home/chatData',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <ChatData />
                </React.Suspense>
            },
            {
                path: '/home/planItem',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <PlanItem />
                </React.Suspense>
            },
            {
                path: '/home/planSchedule',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <PlanSchedule />
                </React.Suspense>
            },
            {
                path: '/home/financeCategory',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <FinanceCategory />
                </React.Suspense>
            },
            {
                path: '/home/financeRecord',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <FinanceRecord />
                </React.Suspense>
            },
            {
                path: '/home/financePlan',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <FinancePlan />
                </React.Suspense>
            },
            {
                path: '/home/financeStatistics',
                element: <React.Suspense fallback={<div>加载中...</div>}>
                    <FinanceStatistics />
                </React.Suspense>
            },
            {
                path: '/home/userList',
                element: <React.Suspense fallback={<div>加载中...</div>}> <AuthAccount /> </React.Suspense>
            },
            {
                path: '/home/roleManage',
                element: <React.Suspense fallback={<div>加载中...</div>}> <AuthRoles /> </React.Suspense>
            },
        ]
    },
    {
        path: '/login',
        // 重定向
        element: <Login />
    },

]
export default router;