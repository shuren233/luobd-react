
import React, {useEffect,useState} from "react";
import {Button, Input, message} from "antd";
import {SendOutlined,SearchOutlined} from '@ant-design/icons';
import {ConversationDTO, ConversationInput, ConversationRecordDTO} from "@/types/chat";
import {createConversation,listConversation} from '@/api/chat'

const records:ConversationRecordDTO[] = [
    {
        id: 1,
        conversationId: 1,
        content: '你好',
        createTime: '2023-05-05',
        chatType: 'text',
        chatModel: 'chatglm',
        isQuestion: true
    },
    {
        id: 2,
        conversationId: 1,
        content: '你好1111',
        createTime: '2023-05-05',
        chatType: 'text',
        chatModel: 'chatglm',
        isQuestion: false
    },
]





const App: React.FC = () => {

    const [printMessage,setprintMessage] = useState<string>('');
    const [conversations,setConversations] = useState<ConversationDTO[]>([]);
    const [conversationId,setConversationId] = useState<number>(0);
    const [inputContent,setInputContent] = useState<string>('');
    const [isConnect,setIsConnect] = useState<boolean>(false);
    useEffect(() => {
        getConversationList();
    },[])

    const changeConversation = (id:number) => {
        console.log('发送请求获取会话记录',id)
        setConversationId(id)
    }
    const connectEventSource = () => {
        if (!isConnect) {
            const evtSource = new EventSource("http://localhost:8080/api/chatglm/conversation");
            evtSource.onmessage = function(event:MessageEvent) {
                console.log(event);
                setprintMessage(text=>text + event.data)
            }
            evtSource.onopen = function(event:Event) {
                console.log("SSE 服务连接成功",event)
                setIsConnect(true)
                setprintMessage('');
            }
            evtSource.onerror = function(event:Event) {
                console.log(event)
                message.error('sse连接失败')
            }
            return () => {
                evtSource.close();
            }
        }
    }

    const getConversationList = () => {
        listConversation().then(res => {
            if (res.code === 200) {
                setConversations(res.data)
            }
        })
        }

    const addConversation=  () => {
        const input:ConversationInput = {
            conversationName: inputContent.length > 50 ? inputContent.substring(0,50) : inputContent,
            id: 0
        }
        // 创建会话
        createConversation(input).then(res => {
            if (res.code === 200) {
                setConversationId(() => res.data)
                const newConversation:ConversationDTO = {
                    id: res.data,
                    conversationName: inputContent
                }
                setConversations((prev) => [...prev,newConversation])
                sendMessage(conversationId,inputContent)
            }
        })

    }
    const sendMessage =  (id:number,content:string) => {
        console.log('发送消息',id,content)
        connectEventSource()
    }

    const trySendMessage =   () => {
        if (inputContent.trim() === '') {
            return;
        }
        if (conversationId === 0) {
             addConversation();

        }else {
            sendMessage(conversationId,inputContent)
        }
    }
    return (
        <>
        <div className={'container'} style={{width: '100%',
            height: '100%',borderRadius: '10px',display: 'flex'}}>

            <div className="list" style={{width: '200px',height: '100%',backgroundColor: '#fff',borderRadius: '10px'}}>
                <div className="search">
                    <Input  size="small" prefix={<SearchOutlined />} placeholder="搜索对话" style={{width: '100%',height: '30px',
                        border: 'none',backgroundColor: '#gray',marginTop: '10px'}}/>
                </div>
                <ul className="listItem">
                    {
                        conversations.map((data) => {
                            return (
                                <li className="item" key={data.id} onClick={() => changeConversation(data.id)} style={{width: '100%',height: '30px',lineHeight: '30px',textAlign: 'center',backgroundColor: 'gray',color: '#fff',cursor: 'pointer',marginTop: '10px'}} >
                                    {data.conversationName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="conversation" style={{display: 'flex',flexDirection: 'column',height: '100%',marginLeft: '20px',
                flex: '1',backgroundColor: '#fff',borderRadius: '10px'}}>
                <div className="content" style={{flex: '1',display: 'flex',flexDirection: 'column',justifyContent: 'end'}} >
                    {
                        records.map((data) => {
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
                    <Input.TextArea onChange={(e) => setInputContent(e.target.value)} style={{width: '100%',height: '100%',border: 'none'}}/>
                    <Button icon={<SendOutlined />} onClick={trySendMessage} style={{width: '60px',height: '100%',backgroundColor: '#fff',border: 'none'}} />
                </div>

            </div>







        </div>
        </>

    )



}


export default App;