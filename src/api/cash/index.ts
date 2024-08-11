import httpService from "../httpService";
import {HttpResponse} from "@/types/common";
import {CashProject, CashProjectInput, CashProjectPageInput} from "@/types/cash";



export const page = (input:CashProjectPageInput) => httpService.post<any,HttpResponse<CashProject[]>>('/api/cash/project/page',input)


export const create = (input:CashProjectInput) => httpService.post<any,HttpResponse<number>>('/api/cash/project/create',input)


export const update = (input:CashProjectInput) => httpService.post<any,HttpResponse<boolean>>('/api/cash/project/update',input)