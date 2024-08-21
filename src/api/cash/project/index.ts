import httpService from "../../httpService";
import {HttpResponse, SelectDTO} from "@/types/common";
import {CashProject, CashProjectInput, CashProjectPageInput} from "@/types/cash/project";



export const page = (input:CashProjectPageInput) => httpService.post<any,HttpResponse<CashProject[]>>('/api/cash/project/page',input)

export const create = (input:CashProjectInput) => httpService.post<any,HttpResponse<number>>('/api/cash/project/create',input)

export const update = (input:CashProjectInput) => httpService.post<any,HttpResponse<boolean>>('/api/cash/project/update',input)

export const remove = (id:number) => httpService.get<any,HttpResponse<boolean>>('/api/cash/project/delete?id='+id)

export const select = () => httpService.get<any,HttpResponse<SelectDTO[]>>('/api/cash/project/select')