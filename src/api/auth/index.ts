import httpService from "../httpService";
import {LoginInput} from "@/types/auth";
import {HttpResponse} from "@/types/common";


export const loginRequest = (input:LoginInput) => httpService.post<any,HttpResponse<string>>('/api/auth/login',input)