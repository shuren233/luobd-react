
import React, {useEffect, useState} from "react";
import style from './project.module.scss'
import dayjs from "dayjs";
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table, Pagination, Modal, Form, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {CashProject, CashProjectInput, CashProjectPageInput} from "@/types/cash/project";
import {HttpResponse} from "@/types/common";
import {create, page, remove, update} from "@/api/cash/project";
import Column from "antd/es/table/Column";


const App: React.FC = () => {


    const [visible,setVisible] = useState(false)
    const [title,setTitle] = useState('新增项目')
    const [form] = Form.useForm();
    const [list,setList] = useState<CashProject[]>([])
    const [total,setTotal] = useState(0);
    const [id,setId] = useState<number>(0)
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


    const edit = (record:CashProject) => {
        setTitle('编辑项目')
        setId(record.id)
        console.log('edit',record.projectDate);
        form.setFieldsValue({
            projectName:record.projectName,
            projectDate:dayjs(record.projectDate),
            remark:record.remark
        })
        setVisible(true)
    }


    const deleteById = async (id:number)  =>{
         const res:HttpResponse<boolean> =  await remove(id)
        if(res.code === 200) {
            setTimeout(() => {
                message.success('删除成功')
                getPage()
            },50)
        }
    }
    const closeModel = () => {
        setVisible(false)
        setId(0)
        form.resetFields(['projectName','projectDate','remark']);
    }
    const submit =  () => {
        const input:CashProjectInput = {
            id:id,
            projectName: form.getFieldValue('projectName'),
            projectDate: form.getFieldValue('projectDate').format('YYYY-MM-DD'),
            remark: form.getFieldValue('remark')
        }


        if (input.id === 0) {
            create(input).then(res => {
                if(res.code === 200) {
                    setTimeout(() => {
                        getPage()
                        message.success('新增成功')
                        closeModel()
                    },50)
                }
            })
        }else {
            update(input).then(res => {
                if(res.code === 200) {
                    setTimeout(() => {
                        getPage()
                        message.success('修改成功')
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
                width={'400px'}
                footer={null}
            >
            <Form  onFinish={submit} form={form} style={{marginTop: '20px'}} labelAlign={'left'}>
                <FormItem name={'projectName'} label={'项目名称'} rules={[{ required: true, message: '请输入项目名称' }]}>
                    <Input    placeholder={'请输入项目名称'} />
                </FormItem>
                <FormItem name={'projectDate'} label={'项目日期'}   rules={[{ required: true, message: '请选择项目日期' }]} >
                    <DatePicker<string> format={'YYYY-MM-DD'}  style={{width: '280px'}} />
                </FormItem>
                <FormItem    name={'remark'} label={'备注信息'}>
                    <TextArea   placeholder={'请输入备注信息'} />
                </FormItem>

                <FormItem>
                    <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                        <Button htmlType={'submit'} type={"primary"}>提交</Button>
                        <Button style={{marginLeft: '20px'}} onClick={closeModel}>取消</Button>
                    </div>
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
                 <Column key={'projectName'} title={'项目名称'} dataIndex={'projectName'}  />
                    <Column key={'projectDate'} title={'项目日期'} dataIndex={'projectDate'} />
                    <Column key={'createTime'} title={'创建时间'} dataIndex={'createTime'} />
                    <Column key={'updateTime'} title={'更新时间'} dataIndex={'updateTime'} />
                    <Column key={'remark'} title={'备注'} dataIndex={'remark'} />
                    <Column<CashProject> key={'option'} title={'操作'} dataIndex={'option'} render={(_,record) => (
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