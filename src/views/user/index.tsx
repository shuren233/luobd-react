import React,{lazy} from 'react';

const ChatInput = lazy(() => import('@/components/chat/input'))


const App: React.FC = () => {
    return (
        <>
            <ChatInput />
        </>
    );
};

export default App;