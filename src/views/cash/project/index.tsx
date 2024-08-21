
import React, {useEffect, useState} from "react";
import style from './project.module.scss'
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table, Pagination, Modal, Form, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {CashProject, CashProjectInput, CashProjectPageInput} from "@/types/cash/project";
import {HttpResponse} from "@/types/common";
import {create, page, remove, update} from "@/api/cash/project";
import Column from "antd/es/table/Column";
import moment from "moment";


const App: React.FC = () => {
    const [visible,setVisible] = useState(false)
    const [title,setTitle] = useState('新增项目')
    const [projectName,setProjectName] = useState('')
    const [form] = Form.useForm();
    const [list,setList] = useState<CashProject[]>([])
    const [total,setTotal] = useState(0);
    const [input,setInput]  = useState<CashProjectInput>({
        id:0,
        projectName:'',
        projectDate:'',
        remark:''
    })


    useEffect(() => {
        getPage()
    },[])


    const getPage= async () => {
        const input:CashProjectPageInput = {
            pageIndex:1,
            pageSize:10,
            projectName:'',
            startProjectDate:'',
            endProjectDate:''
        }

      const res:HttpResponse<CashProject[]> =  await page(input);
        setList(res.data)
        setTotal(res.total)
    }


    const edit = (record:any) => {
        setTitle('编辑项目')
        setProjectName(record.projectName)
        setInput({
            ...input,
            id:record.id,
            projectName:record.projectName,
            projectDate:record.projectDate,
            remark:record.remark
        })
        setVisible(true)
    }


    const deleteById = async (id:string)  =>{
         const res:HttpResponse<boolean> =  await remove(id)
        if(res.code === 200) {
            setTimeout(() => {
                message.success('删除成功')
                getPage()
            },50)
        }
    }

    const projectNameOnChange = (e:any) => {
        setInput({
            ...input,
            projectName:e.target.value
        })
    }

    const projectDateOnChange = (date:any,dateString:string) => {
        console.log(dateString)
        setInput({
            ...input,
            projectDate:dateString
        })
    }

    const remarkOnChange = (e:any) => {
        setInput({
            ...input,
            remark:e.target.value
        })
    }

    const closeModel = () => {
        setVisible(false)
        form.resetFields();
        setInput({
            id:0,
            projectName:'',
            projectDate:'',
            remark:''
        })
    }
    const submit =  () => {
        if (input.id === 0) {
            create(input).then(res => {
                if(res.code === 200) {
                    setTimeout(() => {
                        message.success('新增成功')
                        getPage()
                        closeModel()
                    },50)
                }
            })
        }else {
            update(input).then(res => {
                if(res.code === 200) {
                    setTimeout(() => {
                        message.success('修改成功')
                        getPage()
                        closeModel()
                    },50)
                }
            })
        }
    }





    return (
        <>
            <Modal
                title={title}
                open={visible}
                onClose={closeModel}
                onCancel={closeModel}
                onOk={submit}
                width={'400px'}
            >
            <Form  form={form} style={{marginTop: '20px'}} labelAlign={'left'}>
                <FormItem name={'projectName'} label={'项目名称'} initialValue={input.projectName}>
                    {
                    }
                    <Input value={projectName} onChange={projectNameOnChange} placeholder={'请输入项目名称'} />
                </FormItem>
                <FormItem name={'projectDate'} label={'项目日期'}  initialValue={moment(input.projectDate,'YYYY-MM-DD')}>
                    <DatePicker   format={'YYYY-MM-DD'} value={input.projectDate} onChange={projectDateOnChange} style={{width: '280px'}} />
                </FormItem>
                <FormItem   name={'remark'} label={'备注信息'} initialValue={input.remark}>
                    <TextArea  value={input.remark} onChange={remarkOnChange} placeholder={'请输入备注信息'} />
                </FormItem>
            </Form>

            </Modal>
        <div className={style.cashProject}>
            <div className={style.top}>
                    <FormItem label='项目名称'>
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
                    <Button type={"primary"} onClick={() =>  {
                        setVisible(!visible);
                        setTitle('新增项目')
                    }
                    }>新增</Button>
                </div>
                <Table
                    style={{marginTop:'20px'}}
                    dataSource={list}
                    rowKey={'id'}
                >
                 <Column key={'projectName'} title={'项目名称'} dataIndex={'projectName'} />
                    <Column key={'projectDate'} title={'项目日期'} dataIndex={'projectDate'} />
                    <Column key={'createTime'} title={'创建时间'} dataIndex={'createTime'} />
                    <Column key={'updateTime'} title={'更新时间'} dataIndex={'updateTime'} />
                    <Column key={'remark'} title={'备注'} dataIndex={'remark'} />
                    <Column key={'option'} title={'操作'} dataIndex={'option'} render={(value,record) => (
                        <div>
                            <a onClick={() => edit(record)}>编辑</a>
                            <a style={{marginLeft:'10px'}} onClick={() => deleteById(record.id)}>删除</a>
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