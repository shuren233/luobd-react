
import httpService from "../../httpService";
import {HttpResponse} from "@/types/common";
import {CashItem,CashItemPageInput,CashItemInput} from "@/types/cash/item";

export const page = (input:CashItemPageInput) => httpService.post<any,HttpResponse<CashItem[]>>('/api/cash/item/page',input)

export const create = (input:CashItemInput) => httpService.post<any,HttpResponse<number>>('/api/cash/item/create',input)

export const update = (input:CashItemInput) => httpService.post<any,HttpResponse<boolean>>('/api/cash/item/update',input)


export const remove = (id:number) => httpService.get<any,HttpResponse<boolean>>('/api/cash/item/delete?id='+id)


