import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Pagination, Table} from "antd";
import FormItem from "antd/es/form/FormItem";
import Column from "antd/es/table/Column";
import {AccountPageInput, AuthAccountPageDto, CreateAccountInput} from "@/types/auth";
import {page,create,deleteById} from '@/api/auth/account'
import TextArea from "antd/es/input/TextArea";
import Password from "antd/es/input/Password";



const App: React.FC = () => {

    const [searchForm] = Form.useForm();
    const [form] = Form.useForm();
    const [list,setList] = useState<AuthAccountPageDto[]>([])
    const [open,setOpen] = useState<boolean>(false)
    const [total,setTotal] = useState<number>(0);
    const [pageSize,setPageSize] = useState(15)
    const [pageIndex,setPageIndex] = useState(1)
    const [title,setTitle] = useState('新增用户')


    useEffect(() => {
        getPageList(pageIndex,pageSize);
    },[])


    const getPageList = (pageNo:number,size:number) => {
        const input:AccountPageInput = {
            pageIndex:pageNo,
            pageSize:size,
            searchInfo:searchForm.getFieldValue('searchInfo')
        }
        page(input).then(res=>{
            setList(res.data)
            setTotal(res.total)
        })
    }
    const changePage =  (page:number, pageSize:number) => {
        setPageIndex(page)
        setPageSize(pageSize)
        getPageList(page,pageSize)
    }

    const removeItem = (record:AuthAccountPageDto) => {

        deleteById(record.id).then(res=>{
            if(res.code === 200) {
                message.success('删除成功')
                getPageList(pageIndex,pageSize)
            }
        })

        console.log(record)
    }

    const submit = () => {
        const password = form.getFieldValue('password')
        if(password != form.getFieldValue('confirmPassword')) {
            message.error('两次密码不一致')
            return;
        }
        const input:CreateAccountInput = {
            accountName:form.getFieldValue('accountName'),
            password:form.getFieldValue('password'),
            email:form.getFieldValue('email'),
            phoneNumber:form.getFieldValue('phoneNumber'),
            remark:form.getFieldValue('remark')
        }
        create(input).then(res=>{
            if(res.code === 200) {
                message.success('新增成功')
                getPageList(pageIndex,pageSize)
                setOpen(false)
            }
        })
    }

    const closeModel = () => {
        setOpen(false)
        form.resetFields(['accountName','password','email','phoneNumber','remark','confirmPassword']);
    }


    return <>
        <Modal title={title} open={open} width={'400px'}
               onClose={closeModel}
               onCancel={closeModel}
               footer={null}>
            <Form form={form} labelAlign={'left'} onFinish={submit} autoComplete={'off'}>
                <FormItem label={"用户名称"} name={"accountName"}  rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input placeholder={"用户名"} autoComplete='off' />
                </FormItem>
                <FormItem label={"登录密码"} name={"password"} rules={[{ required: true, message: '请输入密码' },{min:6,message:'密码长度不能小于6'}]}>
                    <Password type={'password'} placeholder={"密码"} autoComplete='off'/>
                </FormItem>
                <FormItem label={"确认密码"} name={"confirmPassword"} rules=
                    {[{ required: true, message: '请再次输入密码'},
                        {min:6,message:'密码长度不能小于6'},
                        {validator:(_,value,callback)=> {
                                if (value !== form.getFieldValue('password')) {
                                    callback('两次密码不一致')
                                } else {
                                    callback()
                                }
                            }}
                    ]}>
                    <Password type={'password'} placeholder={"确认密码"}/>
                </FormItem>
                <FormItem label={"邮箱地址"} name={"email"} rules={[{ required: true, message: '请输入邮箱地址' },{
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱地址'
                }]} labelAlign={"right"}>
                    <Input placeholder={"邮箱地址"}/>
                </FormItem>
                <FormItem label={"手机号码"} name={"phoneNumber"} labelAlign={"right"} rules={[{pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请输入正确的手机号码'}]}>
                    <Input placeholder={"手机号码"}/>
                </FormItem>
                <FormItem label={"备注"} name={"remark"} labelAlign={"right"}>
                    <TextArea placeholder={"备注"}/>
                </FormItem>
                <FormItem>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button type={"primary"} htmlType={'submit'}>确定</Button>
                        <Button style={{marginLeft: '20px'}} onClick={closeModel}>取消</Button>
                    </div>
                </FormItem>
            </Form>
        </Modal>

        <div className={"authAccount"} style={{display:'flex', flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
            <div className="top">
                <Form form={searchForm} layout={"inline"}>
                    <FormItem name={"searchInfo"} label={"用户查询"} labelAlign={"left"}>
                        <Input placeholder={"账户名/用户名/邮箱/手机号"} style={{width:'200px'}} />
                    </FormItem>
                    <FormItem>
                        <Button htmlType={'submit'} type={"primary"} onClick={() => getPageList(pageIndex,pageSize)}>搜索</Button>
                        <Button style={{marginLeft: '20px'}}  onClick={() =>  {
                            searchForm.resetFields(['searchInfo']);
                            getPageList(pageIndex,pageSize);
                        }
                        }>重置</Button>
                    </FormItem>
                </Form>
                <div className="tool" style={{marginTop:'20px'}}>
                    <Button type={"primary"} onClick={()=>{
                        setOpen(true);
                        setTitle("新增用户")

                    }}>新增</Button>
                </div>
            </div>
            <div className="content" style={{flex:'1',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>

                <Table
                    style={{marginTop:'10px',flex:'1'}}
                    dataSource={list}
                    rowKey={'id'}
                    pagination={false}
                >
                    <Column key={"accountName"} title={"账号名称"} dataIndex={"accountName"}/>
                    <Column key={"trueName"} title={"用户名称"} dataIndex={"trueName"}/>
                    <Column key={"email"} title={"电子邮箱"} dataIndex={"email"}/>
                    <Column key={"phoneNumber"} title={"手机号码"} dataIndex={"phoneNumber"}/>
                    <Column key={"remark"} title={"备注"} dataIndex={"remark"}/>
                    <Column key={"createTime"} title={"创建时间"} dataIndex={"createTime"}/>
                    <Column<AuthAccountPageDto> key={"action"} title={"操作"} dataIndex={"action"}
                    render={(_,item:AuthAccountPageDto)=>
                        <div>
                            <a onClick={() => removeItem(item)}>删除</a>
                        </div>
                    }

                    />
                </Table>
                <div className={"footer"} style={{marginTop:'20px',height:'50px'}}>
                    <Pagination pageSizeOptions={['15', '20', '30']} showSizeChanger={true}  onChange={changePage} total={total} />
                </div>
            </div>

        </div>

    </>

};


export default App;

