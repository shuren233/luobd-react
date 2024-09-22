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


export interface RegisterInput {
    accountName:string
    password:string
    email:string
    checkCode:string
}

export interface AccountPageInput extends PageInput {

    searchInfo?:string

    accountName?:string
    email?:string
    phoneNumber?:string

}

export interface AuthRolePageDto {
    id:number
    roleName:string
    roleKey:string
    remark:string
    createTime:string
    userCount:number
    defaulted:boolean
}

export interface CreateRoleInput {
    roleName:string
    roleKey:string
    remark?:string
}

export interface RolePageInput extends PageInput {
    searchInfo?:string


    defaulted?:boolean
}

export interface SetRoleAccountsInput {
    roleId:number
    accountIds:number[]
}





