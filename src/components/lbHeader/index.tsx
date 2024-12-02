import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "antd";
import "./index.scss";

const { Header } = Layout;

const App: React.FC = () => {
    return (
        <Header className="default-header">
            <div className="header-left">
                <span>萝卜丁</span>
            </div>
        </Header>
    );
};

export default App;
