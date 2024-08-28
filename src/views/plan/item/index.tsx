
import React, {useEffect} from "react";
import {Button, Input} from "antd";
import {SendOutlined,SearchOutlined} from '@ant-design/icons';

interface Conversation {
    id: string;

    content: string;

    isQuestion: boolean;
}


const list:Conversation[] = [
    {
        id: '1',
        content: '你好',
        isQuestion: true
    }
]




const App: React.FC = () => {

    const [message,setMessage] = React.useState<string>('');
    useEffect(() => {
        const evtSource = new EventSource("http://localhost:8080/api/chatglm/conversation");
        evtSource.onmessage = function(event:MessageEvent) {
            console.log(event);
            setMessage(text=>text + event.data)
        }
        evtSource.onopen = function(event:Event) {
            console.log("SSE 服务连接成功",event)
            setMessage('');
        }
        evtSource.onerror = function(event:Event) {
            console.log("SSE 服务连接失败",event);
        }

        return () => {
            evtSource.close();
        }

    },[])

    return (
        <>
        <div className={'container'} style={{width: '100%',
            height: '100%',borderRadius: '10px',display: 'flex'}}>

            <div className="list" style={{width: '200px',height: '100%',backgroundColor: '#fff',borderRadius: '10px'}}>
                <div className="search">
                    <Input  size="small" prefix={<SearchOutlined />} placeholder="搜索对话" style={{width: '100%',height: '30px',
                        border: 'none',backgroundColor: '#gray',marginTop: '10px'}}/>
                </div>
            </div>
            <div className="conversation" style={{display: 'flex',flexDirection: 'column',height: '100%',marginLeft: '20px',
                flex: '1',backgroundColor: '#fff',borderRadius: '10px'}}>
                <div className="content" style={{flex: '1',display: 'flex',flexDirection: 'column',justifyContent: 'end'}} >
                    {
                        list.map((data) => {
                            return (
                                <div className="item" style={data.isQuestion ? {width: '100%',height: '60px',display: 'flex',padding: '10px',justifyContent: 'flex-end'} :{ justifyContent: 'flex-start',width: '100%',height: '60px',display: 'flex',padding: '10px'}}>
                                    <div>{data.content}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="printAnswer">
                    <div>{message}</div>
                </div>
                <div className="inputArea" style={{width: '100%', height: '60px',
                    backgroundColor: '#fff',borderTop: '1px solid #ccc',display: 'flex',padding: '10px',marginTop: '10px'}}>
                    <Input.TextArea style={{width: '100%',height: '100%',border: 'none'}}/>
                    <Button icon={<SendOutlined />} style={{width: '60px',height: '100%',backgroundColor: '#fff',border: 'none'}} />
                </div>

            </div>







        </div>
        </>

    )



}


export default App;