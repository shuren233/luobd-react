
import React, {useEffect, useState} from "react";
import {Button, Cascader, DatePicker, Form, Input, InputNumber, message, Modal, Pagination, Table} from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import Column from "antd/es/table/Column";
import {FinanceItem, FinanceItemInput, FinanceItemPageInput} from "@/types/finance";
import {page,remove,create,update} from "@/api/finance";
import TextArea from "antd/es/input/TextArea";
import {tree} from '@/api/core'


const App: React.FC = () => {

    const [searchForm] = Form.useForm()
    const [form] = Form.useForm()
    const [list,setList] = useState<FinanceItem[]>([])
    const [total,setTotal] = useState(0)
    const [pageIndex,setPageIndex] = useState(1)
    const [pageSize,setPageSize] = useState(15)
    const [open,setOpen] = useState(false)
    const [id] = useState(0)
    const [options,setOptions] = useState<Option[]>([])



    interface Option {
        value: number;
        key: number;
        label: string;
        children?: Option[];
        disabled?: boolean;
    }





    useEffect(() => {
        getList(pageIndex,pageSize);
        getTree()
    },[])


    const closeModal = () => {
        setOpen(false)
        form.resetFields(['categoryId','occurTime','amount','remark'])
    }

    const getTree = () => {
        tree('finance').then(res => {
            const options = res.data?.map((item) => {
                return {
                    value: item.id,
                    key: item.id,
                    label: item.categoryName,
                    children: item.children?.map((child) => {
                        return {
                            key: child.id,
                            value: child.id,
                            label: child.categoryName,
                        }
                    })
                }
            })
            setOptions(options)
        })
    }


    const onFinish = () => {
        const categoryIds:number[] = form.getFieldValue('categoryId')
        const input:FinanceItemInput = {
            id:id,
            categoryId: categoryIds[categoryIds.length - 1],
            occurTime:dayjs(form.getFieldValue('occurTime')).format('YYYY-MM-DD HH:mm:ss'),
            amount:form.getFieldValue('amount'),
            remark:form.getFieldValue('remark')
        }

        if(id === 0) {
            create(input).then(res => {
                if (res.code === 200) {
                    message.success('新增成功')
                    closeModal()
                    getList(pageIndex,pageSize)
                }
            })
        }else {
            update(input).then(res => {
                if (res.code === 200) {
                    message.success('修改成功')
                    closeModal()
                    getList(pageIndex,pageSize)
                }
            })
        }
    }



    const getList = (pageIndex:number,pageSize:number) => {
        const input:FinanceItemPageInput = {
            pageIndex:pageIndex,
            pageSize:pageSize,
            categoryName:searchForm.getFieldValue('categoryName'),
            occurStartDate:searchForm.getFieldValue('startDate') ? dayjs(searchForm.getFieldValue('startDate')).format('YYYY-MM-DD') : undefined,
            occurEndDate:searchForm.getFieldValue('endDate') ? dayjs(searchForm.getFieldValue('endDate')).format('YYYY-MM-DD') : undefined
        }
        page(input).then(res => {
            setList(res.data)
            setTotal(res.total)
        })

    }


    const changePage = (pageIndex:number,pageSize:number) => {
        setPageIndex(pageIndex)
        setPageSize(pageSize)
        getList(pageIndex,pageSize)
    }



    const editor = (item:FinanceItem) => {
        form.setFieldValue('categoryId',item.categoryId)
        form.setFieldValue('occurTime',dayjs(item.occurTime))
        form.setFieldValue('amount',item.amount)
        form.setFieldValue('remark',item.remark)
        setOpen(true)
    }

    const removeById = (id:number) => {
        remove(id).then((res) => {
            if (res.code === 200) {
                message.success('删除成功')
                getList(pageIndex,pageSize)
            }
        })
    }


    return (

        <>
        <div>
            <Modal  title={'新增流水'} width={'420px'} open={open}  onCancel={() => closeModal()}  footer={false}>
                <Form onFinish={onFinish} form={form} labelCol={{span:6}} style={{marginTop:'20px'}} >
                    <FormItem  name={'occurTime'} label={'发生时间'} rules={[{required:true,message:'发生时间不能为空'}]}>
                        <DatePicker   format="YYYY-MM-DD HH:mm:ss"  showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}/>
                    </FormItem>
                    <FormItem name={'categoryId'} label={'分类'} rules={[{required:true,message:'分类不能为空'}]}>
                        <Cascader options={options}  />
                    </FormItem>
                    <FormItem name={'amount'} label={'金额'} rules={[{required:true,message:'金额不能为空'}]}>
                        <InputNumber min={'1'}/>
                    </FormItem>
                    <FormItem name={'remark'} label={'备注'}>
                        <TextArea/>
                    </FormItem>
                    <FormItem>
                        <Button type={'primary'} htmlType={'submit'}>确认</Button>
                        <Button style={{marginLeft:'20px'}} onClick={() => closeModal()}>取消</Button>
                    </FormItem>
                </Form>


            </Modal>


            <div className="top">
                <Form onFinish={() => getList(pageIndex,pageSize)} form={searchForm} layout={'inline'}>
                    <FormItem name={'categoryName'} label={'分类名称'}>
                        <Input/>
                    </FormItem>
                    <FormItem name={'startDate'} label={'开始日期'}>
                        <DatePicker  />
                    </FormItem>
                    <FormItem name={'endDate'} label={'结束日期'}>
                        <DatePicker />
                    </FormItem>
                    <FormItem>
                        <Button htmlType={'submit'} type={"primary"}>搜索</Button>
                        <Button style={{marginLeft:'20px'}} onClick={() => {
                            searchForm.resetFields(['categoryName','startDate','endDate'])
                            getList(pageIndex,pageSize)
                        }
                        }>重置</Button>
                    </FormItem>
                </Form>
                <Button type={'primary'} style={{marginLeft:'20px',marginTop:'20px'}} onClick={() => setOpen(true)}>新增</Button>
            </div>

            <div style={{marginTop:'20px'}}>
                <Table pagination={false}  dataSource={list}>
                    <Column key={'categoryName'} title={'分类'} dataIndex={'categoryName'} />
                    <Column key={'occurTime'} title={'发生时间'} dataIndex={'occurTime'}/>
                    <Column key={'amount'} title={'金额'} dataIndex={'amount'}/>
                    <Column key={'createTime'} title={'创建时间'} dataIndex={'createTime'} />
                    <Column key={'updateTime'} title={'更新时间'} dataIndex={'updateTime'}/>
                    <Column key={'remark'} title={'备注'} dataIndex={'remark'}/>
                    <Column<FinanceItem> key={'action'} title={'操作'} render={(_,record) => (
                        <div>
                            <a  onClick={() =>editor(record)}>编辑</a>
                            <a style={{marginLeft:'10px'}} onClick={() => removeById(record.id)}>删除</a>
                        </div>
                        )}
                  />
                </Table>
            </div>

            <div className="footer">
                <Pagination onChange={changePage} pageSizeOptions={['15','30','50']} pageSize={pageSize} current={pageIndex} total={total}  />
            </div>


        </div>
        </>

    )



}


export default App;