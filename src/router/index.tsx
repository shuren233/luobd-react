
import React,{lazy} from "react";
import Login from '@/views/login'
const Home = lazy(() => import('@/views/home'))
const User = lazy(() => import('@/views/user'))

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
            }

        ]
    },
    {
        path: '/login',
        // 重定向
        element: <Login />
    },

]
export default router;