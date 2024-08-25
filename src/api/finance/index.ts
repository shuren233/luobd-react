import httpService from "../httpService";
import {HttpResponse} from "@/types/common";
import {FinanceItem, FinanceItemInput, FinanceItemPageInput} from "@/types/finance";

export const create = (input:FinanceItemInput) => httpService.post<never,HttpResponse<number>>('/api/finance/item/create',input)

export const page = (input:FinanceItemPageInput) => httpService.post<never,HttpResponse<FinanceItem[]>>('/api/finance/item/page',input)


export const remove = (id:number) => httpService.get<never,HttpResponse<number>>('/api/finance/item/delete?id=' + id)

export const update = (input:FinanceItemInput) => httpService.post<never,HttpResponse<number>>('/api/finance/item/update',input)