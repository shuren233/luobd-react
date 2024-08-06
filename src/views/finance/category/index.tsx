
import React from "react";
import style from './category.module.scss'
import {Button, Input, Pagination, Table, Tree} from "antd";
import FormItem from "antd/es/form/FormItem";
const { TreeNode } = Tree;


const data = [
    {
        categoryName: 'John Brown',
        remark: 32,
        status: 'New York No. 1 Lake Park',
        createTime: '2024-01-12 20:00:00',
    },
    {

        categoryName: 'John Brown',
        remark: 32,
        status: 'New York No. 1 Lake Park',
        createTime: '2024-01-12 20:00:00',
    },
    {

        categoryName: 'John Brown',
        remark: 32,
        status: 'New York No. 1 Lake Park',
        createTime: '2024-01-12 20:00:00',
    },
];
const columns = [
    { title: '分类名称', dataIndex: 'categoryName', key: 'categoryName' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
        title: '操作',
        key: 'option',
        render: () => <div>
            <a onClick={() => alert("1")}>编辑</a>
            <a style={{marginLeft:'10px'}} onClick={() => alert("1")}>删除</a>
        </div>
    },
];


const App: React.FC = () => {
    return (
        <>
        <div className={style.financeCategory}>
            <div className={style.left}>
                <Tree
                    defaultExpandedKeys={['0-0-0', '0-0-1']}
                    defaultSelectedKeys={['0-0-0', '0-0-1']}
                    defaultCheckedKeys={['0-0-0', '0-0-1']}
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="parent 1-0" key="0-0-0" disabled>
                            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                            <TreeNode title="leaf" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </div>
            <div className={style.right}>
                <div className={style.top}>
                    <div style={{display: 'flex'}}>
                        <FormItem label={'分类名称'}>
                            <Input style={{width: '200px'}}  />
                        </FormItem>
                        <Button style={{marginLeft:'20px'}} type={'primary'}>搜索</Button>
                    </div>
                    <Button  type={'primary'}>新增</Button>
                </div>
                <div className={style.content}>
                    <Table
                        style={{marginTop:'20px'}}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
                <div className={style.footer}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
        </>

    )



}


export default App;