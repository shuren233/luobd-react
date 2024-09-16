
import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {SendOutlined} from '@ant-design/icons';
import {ChatInput,ConversationRecordDTO} from "@/types/chat";
import {completions} from '@/api/chat'

const App: React.FC = () => {
    const [printMessage,setPrintMessage] = useState<string>('');
    const [form] = Form.useForm();
    const [data,setData] = useState<ConversationRecordDTO[]>([]);
    const [disable,setDisable] = useState<boolean>(false)



    const requestChat = async () => {
        setDisable(true)
        const message:string = form.getFieldValue('content')
        addConversationToList(message,true)
        form.resetFields(['content']);
        const {body} = await completions({prompt: message,model: 'gpt-3.5-turbo'} as ChatInput);
        const reader = body!.getReader();
        const decoder = new TextDecoder();
        let content:string = '';
        new ReadableStream({



            start(controller) {
                console.log('开始读取流');
                async function push() {
                    const {done, value} = await reader.read();
                    console.log('done',done)
                    if (done) {
                        console.log('结束读取流:',content)
                        addConversationToList(content,false)
                        setPrintMessage('');
                        setDisable(false)
                        controller.close();
                        return;
                    }
                    controller.enqueue(value);
                    const text = decoder.decode(value);
                    setPrintMessage(pre => pre + text);
                    content += text
                    push();
                }

                push();
            },
        });

    }


    // const getConversationList = () => {
    //     listConversation().then(res => {
    //         if (res.code === 200) {
    //             setConversations(res.data)
    //         }
    //     })
    //     }

    const addConversationToList = (content:string,isQuestion:boolean) => {
        const newRecord:ConversationRecordDTO = {
            id: data.length + 1,
            chatModel: 'chatglm',
            chatType: 'text',
            content: content,
            conversationId: 1,
            createTime: new Date().toLocaleString(),
            isQuestion: isQuestion
        }
        setData((prev) => [...prev,newRecord])
    }


    // const addConversation=  () => {
    //     const input:ConversationInput = {
    //         conversationName: inputContent.length > 50 ? inputContent.substring(0,50) : inputContent,
    //         id: 0
    //     }
    //     // 创建会话
    //     createConversation(input).then(res => {
    //         if (res.code === 200) {
    //             setConversationId(() => res.data)
    //             const newConversation:ConversationDTO = {
    //                 id: res.data,
    //                 conversationName: inputContent
    //             }
    //             setConversations((prev) => [...prev,newConversation])
    //             sendMessage(conversationId,inputContent)
    //         }
    //     })
    //
    // }


    return (
        <>
        <div className={'container'} style={{width: '100%',
            height: '100%',borderRadius: '10px',display: 'flex'}}>

            {/*<div className="list" style={{width: '200px',height: '100%',backgroundColor: '#fff',borderRadius: '10px'}}>*/}
            {/*    <div className="search">*/}
            {/*        <Input  size="small" prefix={<SearchOutlined />} placeholder="搜索对话" style={{width: '100%',height: '30px',*/}
            {/*            border: 'none',backgroundColor: '#gray',marginTop: '10px'}}/>*/}
            {/*    </div>*/}
            {/*    <ul className="listItem">*/}
            {/*        {*/}
            {/*            conversations.map((data) => {*/}
            {/*                return (*/}
            {/*                    <li className="item" key={data.id} onClick={() => changeConversation(data.id)} style={{width: '100%',height: '30px',lineHeight: '30px',textAlign: 'center',backgroundColor: 'gray',color: '#fff',cursor: 'pointer',marginTop: '10px'}} >*/}
            {/*                        {data.conversationName}*/}
            {/*                    </li>*/}
            {/*                )*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div className="conversation" style={{display: 'flex',flexDirection: 'column',height: '100%',marginLeft: '20px',
                flex: '1',backgroundColor: '#fff',borderRadius: '10px'}}>
                <div className="content" style={{flex: '1',display: 'flex',flexDirection: 'column',justifyContent: 'end'}} >
                    {
                        data.map((data) => {
                            return (
                                <div className="item" style={data.isQuestion ? {width: '100%',height: '60px',display: 'flex',padding: '10px',justifyContent: 'flex-end'} :{ justifyContent: 'flex-start',width: '100%',height: '60px',display: 'flex',padding: '10px'}}>
                                    <div>{data.content}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="printAnswer">
                    <div>{printMessage}</div>
                </div>
                <div className="inputArea" style={{width: '100%', height: '60px',
                    backgroundColor: '#fff',borderTop: '1px solid #ccc',display: 'flex',padding: '10px',marginTop: '10px'}}>
                    <Form form={form} layout={'inline'} onFinish={requestChat}>
                        <Form.Item name="content" style={{width: '100%'}} rules={[{ required: true, message: '请输入内容' }]}>
                            <Input.TextArea  style={{width: '100%',height: '100%',border: 'none'}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={'submit'} disabled={disable}  icon={<SendOutlined />}  style={{width: '60px',height: '100%',backgroundColor: '#fff',border: 'none'}} />
                        </Form.Item>
                    </Form>
                </div>

            </div>







        </div>
        </>

    )



}


export default App;