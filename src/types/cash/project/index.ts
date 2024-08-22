import {PageInput} from "@/types/common";

export interface CashProject {
    id:number
    projectName:string,
    projectDate:string,
    remark:string,

    createTime:string,
}



export interface CashProjectInput {
    id:number
    projectName:string,
    projectDate:string,
    remark:string
}

export interface CashProjectPageInput extends PageInput{


    projectName:string
    startProjectDate:string

    endProjectDate:string

}

