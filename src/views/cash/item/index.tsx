
import React, { useEffect, useState} from "react";
import style from './item.module.scss'
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table, Pagination, Modal, Form, Select, InputNumber,message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
import Column from "antd/es/table/Column";
import {CashItem, CashItemPageInput} from "@/types/cash/item";
import {page,create,update,remove} from "@/api/cash/item";
import {HttpResponse, SelectDTO} from "@/types/common";
import {select} from "@/api/cash/project";

const App: React.FC = () => {
    const [visible,setVisible] = useState(false)
    const [title,setTitle] = useState('新增明细')
    const [selectList,setSelectList] = useState<SelectDTO[]>([])
    const [pageInput,setPageInput] = useState<CashItemPageInput>({
        pageIndex:1,
        pageSize:15
    })

    const [input,setInput]  = useState<CashItemInput>({
        amount:0,
        cashUserName:'',
        id:0,
        projectId:null,
        remark:''
    })


    const [total,setTotal] = useState(0)
    const [list,setList] = useState<CashItem[]>([])
    const [form] = Form.useForm();

    useEffect(() => {
        getPage();
    },[])


    const getSelectList = async () => {
        const res:HttpResponse<SelectDTO[]> = await select()
        setSelectList(res.data)
    }


    const getPage = async () => {
        const res:HttpResponse<CashItem[]> =  await page(pageInput)
        setList(res.data)
        setTotal(res.total)
    }


    const selectProject = (value:number) => {
        setInput({
            ...input,
            projectId:value
        })
    }

    const changeCashUserName = (e:any) => {
        setInput({
            ...input,
            cashUserName:e.target.value
        })
    }

    const changeAmount = (e:any) => {
        setInput({
            ...input,
            amount:e
        })
    }

    const changeRemark = (e:any) => {
        setInput({
            ...input,
            remark:e.target.value
        })
    }


    const closeModal = (flush:boolean) => {
        console.log(flush)
        if(flush) {
            getPage()
        }
        setVisible(false)
        form.resetFields()
        setInput({
            amount:0,
            cashUserName:'',
            id:0,
            projectId:null,
            remark:''
        })
    }


    const removeById =  (id:number) => {
        Modal.confirm({
            title: '确定删除吗？',
            onOk: () => {
                remove(id).then(res => {
                    if(res.code === 200) {
                        getPage()
                        setTimeout(() => {
                            message.success('删除成功')
                        })
                    }
                })
            }
        })
    }

    const editor = (record:CashItem):void => {
        setInput(
            {
                amount:record.amount,
                cashUserName:record.cashUserName,
                id:record.id,
                projectId:record.projectId,
                remark:record.remark
            }
        )
        setTitle('编辑明细')
        setVisible(true)
    }



    const submit = () => {
        if (input.id === 0) {
            create(input).then(res => {
                if(res.code === 200) {
                    closeModal(true)
                    setTimeout(() => {
                        message.success('新增成功')
                    })
                }
            })
        }else {
            update(input).then(res => {
                if(res.code === 200) {
                    closeModal(true)
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
                onCancel={() => closeModal(false)}
                onOk={submit}
                width={'400px'}
            >

                <Form  form={form} style={{marginTop: '20px'}} labelAlign={'left'}>
                    <FormItem name={'projectName'} label={'礼金项目'} initialValue={input.projectId}>
                        <Select allowClear  value={input.projectId}  onFocus={() => getSelectList()}  onSelect={selectProject}>
                            {selectList.map(item => (<Option key={item.key} value={item.key}>{item.value}</Option>))}
                        </Select>
                    </FormItem>
                    <FormItem name={'cashUserName'} label={'送礼人名'} initialValue={input.cashUserName}>
                        <Input  value={input.cashUserName} onChange={changeCashUserName}  placeholder={'送礼人名'} />
                    </FormItem>
                    <FormItem name={'amount'} label={'礼金金额'} initialValue={input.amount}>
                        <InputNumber min={'0'}  value={input.amount}  onChange={changeAmount} style={{width: '280px'}} placeholder={'礼金金额'} />
                    </FormItem>
                    <FormItem  name={'remark'} label={'备注信息'} initialValue={input.remark}>
                        <TextArea value={input.remark} onChange={changeRemark} />
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
                    <Button type={"primary"} className={style.space} onClick={() => getPage()}>搜索</Button>
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
                    >
                        <Column key={'projectName'} title={'项目名称'} dataIndex={'projectName'} />
                        <Column key={'projectDate'} title={'项目日期'} dataIndex={'projectDate'} />
                        <Column key={'cashUserName'} title={'送礼人'} dataIndex={'cashUserName'} />
                        <Column key={'amount'}  title={'礼金金额'} dataIndex={'amount'} />
                        <Column key={'createTime'} title={'创建时间'} dataIndex={'createTime'} />
                        <Column key={'updateTime'} title={'更新时间'} dataIndex={'updateTime'} />
                        <Column key={'remark'} title={'备注'} dataIndex={'remark'} />
                        <Column key={'option'} title={'操作'} dataIndex={'option'} render={(value,record) => (
                            <div>
                                <a  onClick={() =>editor(record)}>编辑</a>
                                <a style={{marginLeft:'10px'}} onClick={() => removeById(record.id)}>删除</a>
                            </div>
                        )} />
                    </Table>
                </div>
                <div className="footer">
                    <Pagination defaultCurrent={1} total={total} />
                </div>
            </div>
        </>

    )

}
export default App;