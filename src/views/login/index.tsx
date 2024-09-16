import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import style from './login.module.scss'
import {Button, Card, Form, Input, message} from "antd";
import init from './init.ts'
import MD5 from 'crypto-js/md5'
import {Base64Captcha, LoginInput} from "@/types/auth";
import {useDispatch} from "react-redux";
import {setToken} from "@/store/modules/userStore";
import {getCaptchaBase64, loginRequest} from "@/api/auth";
import {HttpResponse} from "@/types/common";
import FormItem from "antd/es/form/FormItem";
import { UserOutlined,LockOutlined} from "@ant-design/icons";

const App:React.FC =  () => {
    const [captcha,setCaptcha] = useState("");
    const [captchaId,setCaptchaId] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm<{username:string,password:string,checkCode:string}>();
    const username = Form.useWatch('username',form);
    const password = Form.useWatch('password',form);
    const checkCode = Form.useWatch('checkCode',form);
    useEffect(() => {
        init();
        window.onresize = function (){init()}
        getCaptcha()
    },[])
    const getCaptcha = async () => {
        const res:HttpResponse<Base64Captcha> = await getCaptchaBase64()
        if (res.code === 200) {
            const data:Base64Captcha = res.data;
            setCaptcha(data.base64)
            setCaptchaId(data.id)
        }
    }

    const submit =  async () => {
        const input:LoginInput = {
            username: username,
            password: MD5(password).toString(),
            captcha: checkCode,
            captchaId: captchaId
        }
        const response:HttpResponse<string> = await loginRequest(input);
        if(response.code === 200) {
            message.info('登录成功');
            dispatch(setToken(response.data))
            if(localStorage.getItem('token')) {
                navigate('/')
            }
        }else {
            getCaptcha()
        }
    }



    return (
        <>
            <div  className={style.login}>
                <canvas id="canvas" style={{display:'block'}}>
                </canvas>


                    <Card className={style.loginBox}>
                        <div className={style.title}>
                            <h1>萝卜丁管家</h1>
                            <p>登录您的账户</p>
                        </div>
                        <Form form={form} onFinish={submit}>
                        <FormItem  name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input prefix={<UserOutlined />}  placeholder="用户名"  />
                        </FormItem>
                        <FormItem name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password prefix={<LockOutlined />}   placeholder="密码"  />
                        </FormItem>
                        <FormItem name={'checkCode'} rules={[{ required: true, message: '请输入验证码' }]} layout={'horizontal'}>
                            <div style={{display: 'flex'}}>
                                <Input placeholder="验证码"    />
                                <img style={{height: '38px',width: '120px',marginLeft: '10px'}} src={captcha} alt={'加载中'} />
                            </div>
                        </FormItem>
                        <FormItem>
                            <div>
                                <Button htmlType={'submit'}  type={"primary"} size={"large"}>登录</Button>
                                <Button style={{marginLeft: '10px'}} type={"primary"} size={"large"} >注册</Button>
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