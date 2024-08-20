import {createSlice} from "@reduxjs/toolkit";
import {loginRequest} from "@/api/auth";
import {LoginInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";
import {message} from "antd";
import {setTokenKey} from "@/utils/token";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // 先从LocalStore 中获取token
        token: localStorage.getItem('token') || '',
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // 存储到LocalStore
            setTokenKey(action.payload)
        },
    }
})


// 异步登录并存储token
const login =  (input:LoginInput) => {
    return async (dispatch:any) => {
        const response:HttpResponse<string> = await loginRequest(input);
        if(response.code === 200) {
            message.info('登录成功');
            dispatch(setToken(response.data))
            return true;
        }
        return  false;
    }
}

 const {setToken} = userSlice.actions
export {login,setToken}
export default userSlice.reducer
