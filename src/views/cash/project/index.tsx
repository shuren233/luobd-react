
import React, {useState} from "react";
import style from './project.module.scss'
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table, Pagination, Modal, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
const data = [
    {

        projectName: 'John Brown',
        remark: 32,
        projectDate: 'New York No. 1 Lake Park',
        createTime: '2024-01-12 20:00:00',
    },
    {

        projectName: 'Jim Green',
        remark: 42,
        projectDate: 'London No. 1 Lake Park',
        createTime: '2024-01-12 20:00:00',
    },
    {

        projectName: 'Joe Black',
        remark: 32,
        projectDate: 'Sidney No. 1 Lake Park',
        createTime: '2024-01-12 20:00:00',
    },
];
const columns = [
    { title: '项目名称', dataIndex: 'projectName', key: 'projectName' },
    { title: '项目日期', dataIndex: 'projectDate', key: 'projectDate' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
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
    const [visible,setVisible] = useState(false)
    const [title] = useState('新增项目')
    const [form] = Form.useForm();
    const closeVisible = () => {
        setVisible(false);
    }
    const submit = () => {
        console.log(form.validateFields)
    }
    return (
        <>
            <Modal
                title={title}
                visible={visible}
                onCancel={closeVisible}
                onOk={submit}
                width={'400px'}
            >
            <Form  form={form} style={{marginTop: '20px'}} labelAlign={'left'}>
                <FormItem name={'projectName'} label={'项目名称'}>
                    {
                    }
                    <Input placeholder={'请输入项目名称'} />
                </FormItem>
                <FormItem name={'[projectDate'} label={'项目日期'}>
                    <DatePicker style={{width: '280px'}} />
                </FormItem>
                <FormItem  name={'remark'} label={'备注信息'}>
                    <TextArea />
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
                    <Button type={"primary"} className={style.space}>搜索</Button>
            </div>
            <div className="content">
                <div className="tool">
                    <Button type={"primary"} onClick={() => setVisible(!visible)}>新增</Button>
                </div>
                <Table
                    style={{marginTop:'20px'}}
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