import {PageInput} from "@/types/common";

export interface CashItem {
    amount:number,
    cashUserName: string,
    createTime: string,
    createUserId: number,
    deleted: boolean,
    id: number,
    projectDate: string,
    projectId: number,
    projectName: string,
    remark: string,
    status: number,
    updateTime: string,
    updateUserId: number
}


export interface CashItemPageInput extends PageInput{
    cashUserName?:string
    endProjectDate?:string
    projectName?:string
    startProjectDate?:string
    projectId?:number

}


export interface CashItemInput {
    id:number
    amount:number,
    cashUserName: string,
    projectId: number,
    remark: string,

}










