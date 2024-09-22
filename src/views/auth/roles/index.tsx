import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Pagination, Select, Table} from "antd";
import FormItem from "antd/es/form/FormItem";
import Column from "antd/es/table/Column";
import {AuthRolePageDto, CreateRoleInput, RolePageInput} from "@/types/auth";
import {page,create,deleteById} from '@/api/auth/role'
import TextArea from "antd/es/input/TextArea";



const App: React.FC = () => {

    const [searchForm] = Form.useForm();
    const [form] = Form.useForm();
    const [list,setList] = useState<AuthRolePageDto[]>([])
    const [open,setOpen] = useState<boolean>(false)
    const [total,setTotal] = useState<number>(0);
    const [pageSize,setPageSize] = useState(15)
    const [pageIndex,setPageIndex] = useState(1)
    const [title,setTitle] = useState('新增用户')


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

    return <>
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

