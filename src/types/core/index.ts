import {PageInput} from "@/types/common";


export interface CategoryNode {
    id:number;


    type:string;

    categoryName:string;
    parentId:number;
    children:CategoryNode[];
}

export interface CategoryInput {
    id:number;
    categoryName:string;
    parentId:number;
    type:string;
}

export interface CoreCategory {
    id:number;
    categoryName:string;
    parentId:number;
    type:string;
    createTime:string;
    updateTime:string;

    status:number;
}


export interface CategoryPageInput extends PageInput {
    type:string;

    categoryName:string;

    parentId:number;
}



