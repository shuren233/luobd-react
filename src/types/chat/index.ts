
export interface ConversationDTO {
    id: number;
    conversationName: string;
    createTime?: string;
    updateTime?: string;
    remark?: string;

}

export interface ConversationRecordDTO {

    id: number;

    conversationId: number;

    content: string;

    createTime: string;

    chatType: string;

    chatModel: string;

    isQuestion: boolean;
}

export interface ConversationInput {

    id: number;

    conversationName: string;

}
