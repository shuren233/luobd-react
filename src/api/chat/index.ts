import httpService from "../httpService";
import {HttpResponse} from "@/types/common";
import {ChatInput, ConversationDTO, ConversationInput} from "@/types/chat";

const headers = {
    'Content-Type': 'application/json;charset=utf-8'
}

const HOST = import.meta.env.VITE_API_URL;

export const createConversation = (input:ConversationInput) => httpService.post<never,HttpResponse<number>>('/api/chat/conversation/create',input)


export const listConversation = () => httpService.get<never,HttpResponse<ConversationDTO[]>>('/api/chat/conversation/list')


export const chatConversation = () => httpService.get<never,HttpResponse<string>>('/api/chatglm/conversation')


export const completions = (data:ChatInput) => {
    return fetch(`${HOST}/api/chatglm/conversation`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(data),
    });
};