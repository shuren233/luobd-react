import httpService from "@/api/httpService";
import {AccountPageInput, AuthAccountPageDto, CreateAccountInput, RegisterInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";



export const page = (input:AccountPageInput) => httpService.post<never,HttpResponse<AuthAccountPageDto[]>>('/api/core/account/page',input)


export const create = (input:CreateAccountInput) => httpService.post<never,HttpResponse<string>>('/api/core/account/create',input)


export const deleteById = (id:number) => httpService.get<never,HttpResponse<boolean>>('/api/core/account/deleteById?id='+id)
export const register = (input:RegisterInput) => httpService.post<never,HttpResponse<string>>('/api/core/account/register',input)


export const sendCheckCodeEmail = (email:string) => httpService.get<never,HttpResponse<boolean>>('/api/core/account/sendCheckCodeEmail?emailUser='+email)