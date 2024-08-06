
import React, {useState} from "react";
import style from './item.module.scss'
import FormItem from "antd/es/form/FormItem";
import {Button, DatePicker, Input, Table, Pagination, Modal, Form, Select, InputNumber} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
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
    { title: '送礼人', dataIndex: 'cashUserName', key: 'cashUserName' },
    { title: '礼金金额', dataIndex: 'amount', key: 'amount' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    {
        title: '操作',
        key: 'option',
        render: (row,record) => <div>
            <a onClick={() => alert("1")}>编辑</a>
            <a style={{marginLeft:'10px'}} onClick={() => alert("1")}>删除</a>
        </div>
    },
];
const App: React.FC = () => {
    const [visible,setVisible] = useState(false)
    const [title,setTitle] = useState('新增明细')
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
                    <FormItem name={'projectName'} label={'礼金项目'}>
                        <Select>
                            <Option>项目1</Option>
                            <Option>项目2</Option>
                            <Option>项目3</Option>
                        </Select>
                    </FormItem>
                    <FormItem name={'cashUserName'} label={'送礼人名'}>
                        <Input placeholder={'送礼人名'} />
                    </FormItem>
                    <FormItem name={'amount'} label={'礼金金额'}>
                        <InputNumber min={'0'} style={{width: '280px'}} placeholder={'礼金金额'} />
                    </FormItem>
                    <FormItem  name={'remark'} label={'备注信息'}>
                        <TextArea />
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