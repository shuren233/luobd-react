
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
// 初始化全局样式
import 'reset-css'
// 引入自定义全局样式
import '@/assets/style/global.scss'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "@/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
      <Provider store={store}  >
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </Provider>
)
