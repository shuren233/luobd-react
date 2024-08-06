
import React from "react";
import style from './project.module.scss'
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table,Pagination } from "antd";





const data = [
    {
        key: 1,
        name: 'John Brown',
        remark: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        remark: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Joe Black',
        remark: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];
const App: React.FC = () => {

    const columns = [
        { title: '项目名称', dataIndex: 'projectName', key: 'projectName' },
        { title: '项目日期', dataIndex: 'projectDate', key: 'projectDate' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        { title: '备注', dataIndex: 'remark', key: 'remark' },
        {
            title: '操作',
            key: 'option',
            render: (row,record) => <a onClick={() => alert("1")}>Delete</a>,
        },
    ];




    return (
        <>
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
                    <Button type={"primary"} className={style.space}>搜索</Button>
            </div>
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
            <div className="footer">
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
        </>

    )



}


export default App;