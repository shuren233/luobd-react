import {createSlice} from "@reduxjs/toolkit";
import {loginRequest} from "@/api/auth";
import {LoginInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";
import {message} from "antd";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || '',
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
    }
})


const login =  (input:LoginInput) => {
    return async (dispatch) => {
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
