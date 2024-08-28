import httpService from "../httpService";
import {HttpResponse} from "@/types/common";
import {ConversationDTO, ConversationInput} from "@/types/chat";


export const createConversation = (input:ConversationInput) => httpService.post<never,HttpResponse<number>>('/api/chat/conversation/create',input)


export const listConversation = () => httpService.get<never,HttpResponse<ConversationDTO[]>>('/api/chat/conversation/list')