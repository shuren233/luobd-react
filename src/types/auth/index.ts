
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
