import httpService from "@/api/httpService";
import {RolePageInput, AuthRolePageDto, CreateRoleInput, SetRoleAccountsInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";

export const page = (input:RolePageInput) => httpService.post<never,HttpResponse<AuthRolePageDto[]>>('/api/core/roles/page',input)

export const create = (input:CreateRoleInput) => httpService.post<never,HttpResponse<string>>('/api/core/roles/create',input)


export const deleteById = (id:number) => httpService.get<never,HttpResponse<boolean>>('/api/core/roles/deleteById?id='+id)


export const setRoleAccounts = (input:SetRoleAccountsInput) => httpService.post<never,HttpResponse<boolean>>('/api/core/roleUsers/setRoleAccounts',input)

