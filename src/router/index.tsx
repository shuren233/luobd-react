import Home from "@/views/home";
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
        element: <Home />
    }
]
export default router;