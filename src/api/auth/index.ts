import httpService from "../httpService";
import {Base64Captcha, LoginInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";


export const loginRequest = (input:LoginInput) => httpService.post<never,HttpResponse<string>>('/api/auth/login',input)


export const getCaptchaBase64 = () => httpService.get<never,HttpResponse<Base64Captcha>>('/api/captcha/getCaptchaBase64')





