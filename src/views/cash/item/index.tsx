
import React, { useEffect, useState} from "react";
import style from './item.module.scss'
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table, Pagination, Modal, Form, Select, InputNumber,message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
import Column from "antd/es/table/Column";
import {CashItem, CashItemPageInput,CashItemInput} from "@/types/cash/item";
import {page,create,update,remove} from "@/api/cash/item";
import { SelectDTO} from "@/types/common";
import {select} from "@/api/cash/project";

const App: React.FC = () => {
    const [visible,setVisible] = useState(false)
    const [title,setTitle] = useState('新增明细')
    const [selectList,setSelectList] = useState<SelectDTO[]>([])
    const [pageIndex,setPageIndex] = useState(1)
    const [pageSize,setPageSize] = useState(15)
    const [id,setId] = useState<number>(0)
    const [total,setTotal] = useState(0)
    const [list,setList] = useState<CashItem[]>([])
    const [form] = Form.useForm();

    useEffect(() => {
        getPage(pageIndex,pageSize);
    },[])


    const getSelectList =  () => {
         select().then(res => {
             setSelectList(res.data)
         })
    }


    const getPage =  (pageNo:number,size:number) => {
        const pageInput:CashItemPageInput = {
            pageIndex:pageNo,
            pageSize:size
        }
        page(pageInput).then(res => {
            setList(res.data)
            setTotal(res.total)
        })
    }


    const closeModal = () => {
        setVisible(false)
        form.resetFields(['projectId','cashUserName','amount','remark'])
    }


    const removeById =  (id:number) => {
        Modal.confirm({
            title: '确定删除吗？',
            onOk: () => {
                remove(id).then(res => {
                    if(res.code === 200) {
                        getPage(pageIndex,pageSize)
                        setTimeout(() => {
                            message.success('删除成功')
                        })
                    }
                })
            }
        })
    }

    const editor = (record:CashItem):void => {
        setId(record.id)
        form.setFieldValue('projectId',record.projectId)
        form.setFieldValue('cashUserName',record.cashUserName)
        form.setFieldValue('amount',record.amount)
        form.setFieldValue('remark',record.remark)
        setTitle('编辑明细')
        setVisible(true)
    }



    const changePage = (pageNo:number,pageSize:number) => {
        setPageIndex(pageNo)
        setPageSize(pageSize)
        getPage(pageNo,pageSize)
    }


    const submit = () => {

        const input:CashItemInput = {
            id:id,
            projectId:form.getFieldValue('projectId'),
            cashUserName:form.getFieldValue('cashUserName'),
            amount:form.getFieldValue('amount'),
            remark:form.getFieldValue('remark')
        }



        if (input.id === 0) {
            create(input).then(res => {
                if(res.code === 200) {
                    closeModal()
                    getPage(pageIndex,pageSize)
                    setTimeout(() => {
                        message.success('新增成功')
                    })
                }
            })
        }else {
            update(input).then(res => {
                if(res.code === 200) {
                    closeModal()
                    getPage(pageIndex,pageSize)
                    setTimeout(() => {
                        message.success('更新成功')
                    })
                }
            })
        }

    }
    return (
        <>
            <Modal
                title={title}
                open={visible}
                onCancel={() => closeModal()}
                onOk={submit}
                width={'400px'}
            >

                <Form  form={form} style={{marginTop: '20px'}} labelAlign={'left'}>
                    <FormItem name={'projectId'} label={'礼金项目'} >
                        <Select allowClear   onFocus={() => getSelectList()}>
                            {selectList.map(item => (<Option key={item.key} value={item.key}>{item.value}</Option>))}
                        </Select>
                    </FormItem>
                    <FormItem name={'cashUserName'} label={'送礼人名'} >
                        <Input     placeholder={'送礼人名'} />
                    </FormItem>
                    <FormItem name={'amount'} label={'礼金金额'} >
                        <InputNumber min={'0'}    style={{width: '280px'}} placeholder={'礼金金额'} />
                    </FormItem>
                    <FormItem  name={'remark'} label={'备注信息'} >
                        <TextArea   />
                    </FormItem>
                </Form>

            </Modal>
            <div className={style.cashProject}>
                <div className={style.top}>
                    <FormItem label='送礼人名称'>
                        <Input placeholder="名称模糊查询" />
                    </FormItem>
                    <FormItem label='项目名称' className={style.space}>
                        <Input placeholder="项目名称模糊搜索" />
                    </FormItem>
                    <FormItem label='项目开始日期' className={style.space}>
                        <DatePicker  />
                    </FormItem>
                    <FormItem label='项目结束日期' className={style.space}>
                        <DatePicker  />
                    </FormItem>
                    <Button type={"primary"} className={style.space} onClick={() => getPage(pageIndex,pageSize)}>搜索</Button>
                </div>
                <div className="content">
                    <div className="tool">
                        <Button type={"primary"} onClick={() => {
                            setVisible(!visible)
                            setTitle('新增明细')
                        }
                        }>新增</Button>
                    </div>
                    <Table
                        dataSource={list}
                        style={{marginTop:'20px'}}
                        pagination={false}
                    >
                        <Column key={'projectName'} title={'项目名称'} dataIndex={'projectName'} />
                        <Column key={'projectDate'} title={'项目日期'} dataIndex={'projectDate'} />
                        <Column key={'cashUserName'} title={'送礼人'} dataIndex={'cashUserName'} />
                        <Column key={'amount'}  title={'礼金金额'} dataIndex={'amount'} />
                        <Column key={'createTime'} title={'创建时间'} dataIndex={'createTime'} />
                        <Column key={'updateTime'} title={'更新时间'} dataIndex={'updateTime'} />
                        <Column key={'remark'} title={'备注'} dataIndex={'remark'} />
                        <Column<CashItem> key={'option'} title={'操作'} dataIndex={'option'} render={(_,record) => (
                            <div>
                                <a  onClick={() =>editor(record)}>编辑</a>
                                <a style={{marginLeft:'10px'}} onClick={() => removeById(record.id)}>删除</a>
                            </div>
                        )} />
                    </Table>
                </div>
                <div className={style.footer}>
                    <Pagination
                        total={total}
                        showSizeChanger={true}
                        pageSizeOptions={['10','15','20']}
                        onChange={changePage} />
                </div>
            </div>
        </>

    )

}
export default App;