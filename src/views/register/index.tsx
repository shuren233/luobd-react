import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import style from './login.module.scss'
import MD5 from 'crypto-js/md5'
import {Button, Card, Form, Input, message} from "antd";
import init from './init.ts'

import FormItem from "antd/es/form/FormItem";
import { UserOutlined,LockOutlined} from "@ant-design/icons";
import {register,sendCheckCodeEmail} from "@/api/auth/account";
import {RegisterInput} from "@/types/auth";

const App:React.FC =  () => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [count,setCount] = useState(0);
    const [tip,setTip] = useState(`发送验证码`);
    const [form] = Form.useForm<{username:string,password:string,checkCode:string}>();
    useEffect(() => {
        init();
        window.onresize = function (){init()}
    },[])


    useEffect(() => {
        const intervalId = setInterval(() => {
            if(count > 0) {
                setCount(count - 1);
                setTip(`${count}秒后重新发送`);
            }
            if (count === 0) {
                clearInterval(intervalId);
                setTip('发送验证码');
                setLoading(false)
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [count]);



    const sendCheckCode = async () => {
        const email:string = form.getFieldValue('email');
        if (!email) {
            message.error('请输入邮箱地址')
            return;
        }
        if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            message.error('邮箱地址不合法')
            return;
        }
        sendCheckCodeEmail(email).then(res => {
            if (res.code === 200) {
                setLoading(true)
                setCount(59);
            }
        })
    }

    const submit =  async () => {
        const val = MD5(form.getFieldValue('password'));
        const input:RegisterInput = {
            accountName: form.getFieldValue('accountName'),
            email: form.getFieldValue('email'),
            password: val.toString(),
            checkCode: form.getFieldValue('checkCode')
        }
        register(input).then(res => {
            if (res.code === 200) {
                message.success('注册成功,跳转登录页面');
                navigate('/login')
            }
        })
    }

    return (
        <>
            <div  className={style.login}>
                <canvas id="canvas" style={{display:'block'}}>
                </canvas>
                    <Card className={style.loginBox}>
                        <div className={style.title}>
                            <h1>萝卜丁管家</h1>
                            <p>注册您的账户</p>
                        </div>
                        <Form form={form} onFinish={submit}>
                        <FormItem  name={'accountName'} rules={[{ required: true, message: '请输入账户名' }]}>
                            <Input prefix={<UserOutlined />}  placeholder="账户名"  />
                        </FormItem>
                            <FormItem  name={'email'} rules={[{ required: true, message: '请输入邮箱地址' },
                                {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱地址',validateTrigger: 'blur'}]}>
                                <div className="email" style={{display: 'flex'}}>
                                    <Input prefix={<UserOutlined />}  placeholder="邮箱地址" style={{width: '72%'}}  />
                                    <Button type={"primary"} loading={loading}  style={{marginLeft: '10px'}} onClick={() => sendCheckCode()}>{tip}</Button>
                                </div>
                            </FormItem>
                            <FormItem name={'checkCode'} rules={[{ required: true, message: '请输入验证码' }]}>
                                <Input prefix={<LockOutlined />}   placeholder="验证码"  />
                            </FormItem>
                        <FormItem name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password prefix={<LockOutlined />}   placeholder="密码"  />
                        </FormItem>
                            <FormItem name={'confirmPassword'} rules={[{ required: true, message: '请输入二次确认密码' },{
                                validator:(_,value,callback)=> {
                                    if (value !== form.getFieldValue('password')) {
                                        callback('两次密码不一致')
                                    } else {
                                        callback()
                                    }
                                }
                            }]}>
                                <Input.Password prefix={<LockOutlined />}   placeholder="二次确认密码"  />
                            </FormItem>
                        <FormItem>
                            <div>
                                <Button htmlType={'submit'}  type={"primary"} size={"large"}>注册</Button>
                            </div>
                        </FormItem>
                        </Form>
                    </Card>

                <a href={"https://beian.miit.gov.cn/"} style={{color: '#ffffff',position: 'absolute',bottom: '10px',right: '45%',textDecoration: 'none'}} target="_blank">蜀ICP备2024091450号-1</a>
            </div>
        </>
    );
};

export default App;