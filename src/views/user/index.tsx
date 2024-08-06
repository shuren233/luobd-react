import React from 'react';

import {useSelector} from "react-redux";
const App: React.FC = () => {
    const {token} = useSelector((state:StoreDetail) => ({
        token:state.token
    }))
    return (
        <>
            <div>用户信息</div>
            <p>{token}</p>
        </>
    );
};

export default App;