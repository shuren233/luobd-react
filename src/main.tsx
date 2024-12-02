import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
//处理 时间组件显示英文问题
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
// 初始化全局样式
import "reset-css";
// 引入自定义全局样式
import "@/assets/style/global.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "@/store";

dayjs.locale("zh-cn");

console.log("当前环境: " + import.meta.env.MODE);
console.log("API地址: " + import.meta.env.VITE_API_URL);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
);
