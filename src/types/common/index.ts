

export interface HttpResponse<T>{
    /**
     * 状态码
     */
    code:number;

    // 提示消息
    msg:string;

    // 是否成功  true-成功  false-失败
    ok:boolean

    data:T

    // 分页总数
    total:number

}

export interface PageInput {

    pageIndex:number;


    pageSize:number;

}

export interface SelectDTO {

    key:string,

    value:string
}


export interface MenuMapper {
    key:string,
    items:string[]
}









