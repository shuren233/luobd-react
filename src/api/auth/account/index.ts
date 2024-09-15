import httpService from "@/api/httpService";
import {AccountPageInput, AuthAccountPageDto, CreateAccountInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";



export const page = (input:AccountPageInput) => httpService.post<never,HttpResponse<AuthAccountPageDto[]>>('/api/core/account/page',input)


export const create = (input:CreateAccountInput) => httpService.post<never,HttpResponse<string>>('/api/core/account/create',input)