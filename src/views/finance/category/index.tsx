
import React, {useEffect, useState} from "react";
import style from './category.module.scss'
import {Button, Form, Input, message, Modal, Pagination, Select, Table, Tree} from "antd";
import FormItem from "antd/es/form/FormItem";
import {CategoryInput, CategoryNode, CategoryPageInput, CoreCategory} from "@/types/core";
import TextArea from "antd/es/input/TextArea";
const { TreeNode } = Tree;
import {create,remove,page,tree} from '@/api/core'
import Column from "antd/es/table/Column";
const App: React.FC = () => {

    const [categories,setCategories] = useState<CategoryNode[]>([])
    const [form] = Form.useForm()
    const [searchForm] = Form.useForm()
    const [open,setOpen] = useState(false)
    const [id,setId] = useState(0)
    const [list,setList]= useState<CoreCategory[]>([])
    const [total,setTotal] = useState(0)
    const [pageIndex,setPageIndex] = useState(1)
    const [pageSize,setPageSize] = useState(15)
    const [parentId,setParentId] = useState(0)


    useEffect(() => {
        getPage(pageIndex,pageSize,parentId);
        getTree()
    },[])
    const getTree = () => {
        tree('finance').then((res) => {
            setCategories(res.data)
        })
    }
    const closeMadal = () => {
        setOpen(false)
        form.resetFields(["categoryName",'parentId','remark'])
        setId(0)
    }
    const getPage = (pageIndex:number,pageSize:number,parentId:number) => {
        const input:CategoryPageInput = {
            type:'finance',
            pageIndex:pageIndex,
            pageSize:pageSize,
            categoryName:searchForm.getFieldValue('categoryName'),
            parentId:parentId == 0 ? undefined : parentId
        }
        page(input).then((res) => {
            setList(res.data)
            setTotal(res.total)
            message.success(`获取数据成功,共${res.total}条数据`)
        })
    }

    const changeParentId = (parentId:number) => {
        setParentId(parentId)
        getPage(pageIndex,pageSize,parentId)
    }




    const changePagination = (pageNo:number,pageSize:number) => {
        setPageIndex(pageNo)
        setPageSize(pageSize)
        getPage(pageNo,pageSize,parentId)
    }

    const onFinish = () => {
        const input:CategoryInput = {
            categoryName:form.getFieldValue('categoryName'),
            parentId:form.getFieldValue('parentId'),
            remark:form.getFieldValue('remark'),
            type: 'finance',
            id:id
        }
        if(id == 0) {
            create(input).then((res) => {
                if (res.code === 200) {
                    getPage(pageIndex,pageSize,parentId)
                    message.success('新增成功')
                    closeMadal()
                }

            })
        }
    }


    const removeById = (id:number) => {
        remove(id).then((res) => {
            if(res.code === 200) {
                message.success('删除成功')
                getPage(pageIndex,pageSize,parentId)
            }
        })

    }

    const  editor = (record:CoreCategory) => {
        setId(record.id)
        form.setFieldValue('categoryName',record.categoryName)
        form.setFieldValue('remark',record.remark)
        form.setFieldValue('parentId',record.parentId)
        setOpen(true)
    }


    return (
        <>
        <Modal  onCancel={() => closeMadal()} open={open} title={'新增分类'} footer={false} width={'500px'} style={{padding:'20px'}}>
            <Form  form={form} onFinish={onFinish}  labelCol={{span:5}}>
                <FormItem name={'categoryName'} label={'分类名称:'} rules={
                    [{required:true,message:'分类名称不能为空'}]
                }>
                    <Input />
                </FormItem>
                <FormItem name={'parentId'} label={'父级分类'}>
                    <Select allowClear>
                        {
                            categories.map((item) => {
                                return <Select.Option value={item.id}>{item.categoryName}</Select.Option>
                            })
                        }
                    </Select>
                </FormItem>
                <FormItem name={'remark'} label={'备注'}>
                    <TextArea />
                </FormItem>
                <FormItem>
                    <Button type={'primary'} htmlType={'submit'}>确定</Button>
                    <Button style={{marginLeft:'20px'}} onClick={() => closeMadal()}>取消</Button>
                </FormItem>
            </Form>



        </Modal>
        <div className={style.financeCategory}>
            <div className={style.left}>
                <Tree  multiple={false} onSelect={(keys,e) => {
                    console.log(e)
                    const seleted = keys.length > 0
                    const id = seleted ? Number(keys[0]) : 0
                    changeParentId(id)
                }
                }>
                    {
                        categories.map((item) => {
                            return <TreeNode  title={item.categoryName} key={item.id}>
                                {
                                    item.children?.map((item) => {
                                        return <TreeNode selectable={false} isLeaf title={item.categoryName} key={item.id} />
                                    })
                                }
                            </TreeNode>
                        })
                    }
                </Tree>
            </div>
            <div className={style.right}>
                <div className={style.top}>
                    <div>
                        <Form form={searchForm} layout={'inline'}>
                            <FormItem label={'分类名称'}>
                                <Input style={{width: '200px'}}  />
                            </FormItem>
                            <FormItem>
                                <Button style={{marginLeft:'20px'}} type={'primary'} onClick={() => getPage(pageIndex,pageSize,parentId)}>搜索</Button>
                            </FormItem>
                        </Form>

                    </div>
                    <Button  type={'primary'} onClick={() =>setOpen(true)}>新增</Button>
                </div>
                <div className={style.content}>
                    <Table
                        style={{marginTop:'20px'}}
                        dataSource={list}
                        pagination={false}
                        key={'id'}
                    >
                    <Column key={'categoryName'} title={'分类名称'} dataIndex={'categoryName'} />
                        <Column key={'parentName'} title={'父级分类'} dataIndex={'parentName'} />
                    <Column<CoreCategory> key={'status'} title={'状态'} dataIndex={'status'} render={(_,record) => {
                        return record.status == 0 ? '正常' : '禁用'
}} />
                    <Column key={'remark'} title={'备注'} dataIndex={'remark'} />
                        <Column key={'createTime'} title={'创建时间'} dataIndex={'createTime'} />
                        <Column<CoreCategory> key={'option'} title={'操作'} render={(_,record) => (
                            <div>
                                <a  onClick={() =>editor(record)}>编辑</a>
                                <a style={{marginLeft:'10px'}} onClick={() => removeById(record.id)}>删除</a>
                            </div>
                        )} />


                    </Table>
                </div>
                <div className={style.footer}>
                    <Pagination onChange={changePagination} pageSizeOptions={['15','30','50']} defaultCurrent={1} total={total} />
                </div>
            </div>
        </div>
        </>

    )



}


export default App;