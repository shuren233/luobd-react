import {PageInput} from "@/types/common";

export interface FinanceItem {

    id:number;

    categoryId:number;

    categoryName:string;

    occurTime:string;

    amount:number;

    remark:string;

    createTime:string;

    updateTime:string;

    status:number;

    type:number

}


export interface FinanceItemInput {

    id:number;
    categoryId:number;

    amount:number;

    occurTime:string;

    remark?:string;


    type:string;


}

export interface FinanceItemPageInput extends PageInput {

    categoryName?:string;

    occurStartDate?:string;

    occurEndDate?:string;



}

