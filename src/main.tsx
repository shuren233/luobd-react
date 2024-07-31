import React from 'react'
import ReactDOM from 'react-dom/client'
import {Button} from 'antd'
// 初始化全局样式
import 'reset-css'
// 引入自定义全局样式
import '@/assets/style/global.scss'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
      <Button type='primary'>按钮</Button>
  </React.StrictMode>,
)
