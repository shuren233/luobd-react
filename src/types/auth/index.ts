import {PageInput} from "@/types/common";

export interface LoginInput {
    username:string,
    password:string,

    captchaId:string

    captcha:string

}

export interface Base64Captcha {
    base64:string,
    id:string
}


export interface AuthAccountPageDto {
    id:number
    accountName:string
    trueName:string
    email:string
    phoneNumber:string
    remark:string
    createTime:string
}

export interface CreateAccountInput {
    accountName:string
    password:string
    email:string
    remark?:string
    phoneNumber?:string
}

export interface AccountPageInput extends PageInput {
    accountName?:string
    email?:string
    phoneNumber?:string

}

