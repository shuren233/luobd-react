import {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import style from './login.module.scss'
import {Button, Input, message, Space} from "antd";
import init from './init.ts'
import {Base64Captcha, LoginInput} from "@/types/auth";
import {useDispatch} from "react-redux";
import {login} from "@/store/modules/userStore";
import {getCaptchaBase64} from "@/api/auth";
import {HttpResponse} from "@/types/common";

const App =  () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [checkCode,setCheckCode] = useState("");
    const [captcha,setCaptcha] = useState("");
    const [captchaId,setCaptchaId] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        init();
        window.onresize = function (){init()}
        getCaptcha()
    },[])

    const usernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const getCaptcha = async () => {
        const res:HttpResponse<Base64Captcha> = await getCaptchaBase64()
        if (res.code === 200) {
            const data:Base64Captcha = res.data;
            setCaptcha(data.base64)
            setCaptchaId(data.id)
        }
    }


    const passwordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const checkCodeChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCheckCode(e.target.value)
    }


    const submit =  async () => {

        if(!username.trim()) {
            message.warning("请输入用户名")
            return;
        }
        if(!password.trim()) {
            message.warning("请输入密码")
            return;
        }
        if(!checkCode.trim()) {
            message.warning("请输入验证码")
            return;
        }

        const input:LoginInput = {
            username: username,
            password: password,
            captcha: checkCode,
            captchaId: captchaId
        }
        await dispatch(login(input))
        if(localStorage.getItem('token')) {
            navigate('/')
        }
    }



    return (
        <>
            <div  className={style.login}>
                <canvas id="canvas" style={{display:'block'}}>
                </canvas>
                <div className={style.loginBox}>
                    <div className={style.title}>
                        <h1>萝卜丁管家</h1>
                        <p>Strive Everyday</p>
                    </div>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange}  />

                        <div style={{display: 'flex'}}>
                            <Input placeholder="验证码"  onChange={checkCodeChange} />
                            <img style={{height: '38px',width: '120px',marginLeft: '10px'}} src={captcha} alt={'加载中'} />
                        </div>
                    </Space>
                    <Button style={{marginTop: '20px' }} type={"primary"} size={"large"}  onClick={submit} >登录</Button>
                </div>
            </div>
        </>
    );
};

export default App;