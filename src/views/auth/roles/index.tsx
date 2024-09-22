import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Pagination, Select, Table} from "antd";
import FormItem from "antd/es/form/FormItem";
import Column from "antd/es/table/Column";
import {
    AccountPageInput,
    AuthAccountPageDto,
    AuthRolePageDto,
    CreateRoleInput,
    RolePageInput,
    SetRoleAccountsInput
} from "@/types/auth";
import {page, create, deleteById, setRoleAccounts} from '@/api/auth/role'
import {page as accountPage} from '@/api/auth/account'
import TextArea from "antd/es/input/TextArea";
import {TableRowSelection} from "antd/es/table/interface";




const App: React.FC = () => {

    const [searchForm] = Form.useForm();
    const [modalForm] = Form.useForm();
    const [form] = Form.useForm();
    const [list,setList] = useState<AuthRolePageDto[]>([])
    const [open,setOpen] = useState<boolean>(false)
    const [tableOpen,setTableOpen] = useState<boolean>(false)
    const [tablePageIndex,setTablePageIndex] = useState(1)
    const [tablePageSize,setTablePageSize] = useState(15)
    const [tableList,setTableList] = useState<AuthAccountPageDto[]>([])
    const [tableTotal,setTableTotal] = useState<number>(0);
    const [total,setTotal] = useState<number>(0);
    const [pageSize,setPageSize] = useState(15)
    const [pageIndex,setPageIndex] = useState(1)
    const [title,setTitle] = useState('新增用户')
    const [selectRoleId,setSelectRoleId] = useState<number>(0)
    const [selectedRowKeys,setSelectedRowKeys] = useState<number[]>([])


    useEffect(() => {
        getPageList(pageIndex,pageSize);
    },[])


    const getPageList = (pageNo:number,size:number) => {
        const input:RolePageInput = {
            pageIndex:pageNo,
            pageSize:size,
            searchInfo:searchForm.getFieldValue('searchInfo'),
            defaulted: searchForm.getFieldValue('defaulted')
        }
        page(input).then(res=>{
            setList(res.data)
            setTotal(res.total)
        })
    }


    const requestSetRole = () => {

        if(selectedRowKeys.length === 0) {
            message.error('请选择要设置的用户')
            return
        }
        if(selectRoleId === 0) {
            message.error('请选择要设置的角色')
            return
        }
        const input:SetRoleAccountsInput = {
            accountIds:selectedRowKeys,
            roleId:selectRoleId
        }
        setRoleAccounts(input).then(res=>{
            if(res.code === 200) {
                message.success('设置成功')
                closeAccountTable()
                getPageList(pageIndex,pageSize)
            }
        })
    }


    const modalChangePage =  (page:number, pageSize:number) => {
        setTablePageIndex(page)
        setTablePageSize(pageSize)
        getAccountPageList(page,pageSize)
    }

    const changePage =  (page:number, pageSize:number) => {
        setPageIndex(page)
        setPageSize(pageSize)
        getPageList(page,pageSize)
    }

    const removeItem = (record:AuthRolePageDto) => {
        if (record.defaulted) {
            message.error('系统默认角色不允许删除')
            return
        }
        deleteById(record.id).then(res=>{
            if(res.code === 200) {
                message.success('删除成功')
                getPageList(pageIndex,pageSize)
            }
        })

        console.log(record)
    }


    const openAccountTable = (record:AuthRolePageDto) => {
        setTableOpen(true)
        setSelectRoleId(record.id)
        getAccountPageList(tablePageIndex,tablePageSize)
    }

    const closeAccountTable = () => {
        setTableOpen(false)
        setSelectRoleId(0)
        setSelectedRowKeys([])
    }



    const getAccountPageList = (pageNo:number,size:number) => {
        const input:AccountPageInput = {
            pageIndex:pageNo,
            pageSize:size,
        }
        accountPage(input).then(res=>{
            setTableList(res.data)
            setTableTotal(res.total)
        })
    }

    const submit = () => {
        const input:CreateRoleInput = {
            roleName:form.getFieldValue('roleName'),
            roleKey:form.getFieldValue('roleKey'),
            remark:form.getFieldValue('remark')
        }
        create(input).then(res=>{
            if(res.code === 200) {
                message.success('新增成功')
                getPageList(pageIndex,pageSize)
                closeModel()
            }
        })
    }
    const closeModel = () => {
        setOpen(false)
        form.resetFields(['roleName','roleKey',"remark"]);
    }

    const rowSelection: TableRowSelection<AuthAccountPageDto> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeys as number[])
        }
    };


    return <>

        <Modal title={title} open={tableOpen}
               onClose={closeAccountTable}
               onCancel={closeAccountTable}
               width={'800px'}
               footer={null}>
            <Table<AuthAccountPageDto>
                rowSelection={rowSelection}
                style={{marginTop:'10px',flex:'1'}}
                dataSource={tableList}
                rowKey={'id'}
                pagination={false}
            >
                <Column key={"accountName"} title={"账号名称"} dataIndex={"accountName"}/>
                <Column key={"trueName"} title={"用户名称"} dataIndex={"trueName"}/>
                <Column key={"email"} title={"电子邮箱"} dataIndex={"email"}/>
                <Column key={"phoneNumber"} title={"手机号码"} dataIndex={"phoneNumber"}/>
                <Column key={"remark"} title={"备注"} dataIndex={"remark"}/>
            </Table>
            <div className={"footer"} style={{marginTop:'20px',height:'50px'}}>
                <Pagination pageSizeOptions={['15', '20', '30']} showSizeChanger={true}  onChange={modalChangePage} total={tableTotal} />
            </div>
            <Form form={modalForm} labelAlign={'left'} onFinish={requestSetRole} autoComplete={'off'}>
                <FormItem>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button type={"primary"} htmlType={'submit'}>确定</Button>
                        <Button style={{marginLeft: '20px'}} onClick={closeAccountTable}>取消</Button>
                    </div>
                </FormItem>
            </Form>
        </Modal>



        <Modal title={title} open={open} width={'400px'}
               onClose={closeModel}
               onCancel={closeModel}
               footer={null}>
            <Form form={form} labelAlign={'left'} onFinish={submit} autoComplete={'off'}>
                <FormItem label={"角色名称"} name={"roleName"}  rules={[{ required: true, message: '请输入角色名' }]}>
                    <Input placeholder={"角色名"} autoComplete='off' />
                </FormItem>
                <FormItem label={"角色Key值"} name={"roleKey"} rules={[{ required: true, message: '请输入角色Key值' }]}>
                    <Input  placeholder={"密码"} autoComplete='off'/>
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

        <div className={"authRole"} style={{display:'flex', flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
            <div className="top">
                <Form form={searchForm} layout={"inline"}>
                    <FormItem name={"searchInfo"} label={"角色查询"} labelAlign={"left"}>
                        <Input placeholder={"角色名/角色key"} style={{width:'200px'}} />
                    </FormItem>
                    <FormItem name={"defaulted"} label={"是否默认"} labelAlign={"left"}>
                        <Select style={{width:'100px'}}>
                            <Select.Option value={''}>全部</Select.Option>
                            <Select.Option value={'true'}>是</Select.Option>
                            <Select.Option value={'false'}>否</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button htmlType={'submit'} type={"primary"} onClick={() => getPageList(pageIndex,pageSize)}>搜索</Button>
                        <Button style={{marginLeft: '20px'}}  onClick={() =>  {
                            searchForm.resetFields(['searchInfo','defaulted']);
                            getPageList(pageIndex,pageSize);
                        }
                        }>重置</Button>
                    </FormItem>
                </Form>
                <div className="tool" style={{marginTop:'20px'}}>
                    <Button type={"primary"} onClick={()=>{
                        setOpen(true);
                        setTitle("新增角色")

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
                    <Column key={"roleName"} title={"角色名称"} dataIndex={"roleName"}/>
                    <Column key={"roleKey"} title={"角色Key"} dataIndex={"roleKey"}/>
                    <Column key={"userCount"} title={"用户数量"} dataIndex={"userCount"}/>
                    <Column<AuthRolePageDto> key={"defaulted"} title={"是否默认"} dataIndex={"phoneNumber"}
                             render={(_,item:AuthRolePageDto)=>
                                 <div>
                                     {item.defaulted ? '是' : '否'}
                                 </div>
                             }/>
                    <Column key={"remark"} title={"备注"} dataIndex={"remark"}/>
                    <Column key={"createTime"} title={"创建时间"} dataIndex={"createTime"}/>
                    <Column<AuthRolePageDto> key={"action"} title={"操作"} dataIndex={"action"}
                                                render={(_,item:AuthRolePageDto)=>
                                                    <div>
                                                        <a onClick={() => removeItem(item)}>删除</a>
                                                        <a onClick={() => openAccountTable(item)} style={{marginLeft:'20px'}}>添加用户</a>
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

