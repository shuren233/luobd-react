import httpService from "../httpService";
import {HttpResponse} from "@/types/common";
import {CategoryInput, CategoryNode, CoreCategory,CategoryPageInput} from "@/types/core";


// 获取分类树
export const tree = (type:string) => httpService.get<never,HttpResponse<CategoryNode[]>>('/api/core/category/tree?type=' + type)


export const create = (input:CategoryInput) => httpService.post<never,HttpResponse<number>>('/api/core/category/create',input)


export const page = (input:CategoryPageInput) => httpService.post<never,HttpResponse<CoreCategory[]>>('/api/core/category/page',input)

export const remove = (id:number) => httpService.get<never,HttpResponse<number>>('/api/core/category/delete?id=' + id)