import React from 'react'
import {Button} from "antd";
import styles from './chatInput.module.scss'
import TextArea from "antd/es/input/TextArea";


const App: React.FC = () => {
    return <>
        <div className={styles.wrapper}>
            <TextArea
                className={styles.textarea}
                placeholder={"请输入"}
                />
            <Button type="primary" className={styles.btn}>发送(Ctrl+Enter)</Button>
        </div>
    </>
}

export default App
