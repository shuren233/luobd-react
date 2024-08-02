import React from 'react';

import {useSelector} from "react-redux";
const App: React.FC = () => {
    const {num} = useSelector((state:StoreDetail) => ({
        num:state.num
    }))
    return (
        <>
            <div>用户信息</div>
            <p>{num}</p>
        </>
    );
};

export default App;