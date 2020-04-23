import React from 'react';
import QRCode from 'qrcode.react';
import config from '../../config/default';
import { useParams } from 'react-router-dom';
import './Result.css'
// import component
import { Input, Button, Icon, message } from 'antd';
import { useRef } from 'react';
import history from '../../history';


const Result = (props) => {
    const urlDomRef = useRef();
    let { id } = useParams();
    let url = `${config.serverUrl}/${id}`

    const handleCopy = (e) => {
        urlDomRef.current.select();
        document.execCommand('copy');
        message.success("複製成功！")
    }

    const handleCreateNew = () => {
        history.push("/")
    }
    return (
        <div className="container">
            <div style={{ marginTop: "3rem", padding: "2rem 1.5rem", background: "white" }}>
                <div style={{ textAlign: "center" }}>
                    <h3>您的短網址做好了</h3>
                </div>
                <div className="fullWidthOnSmall" style={{ display: "flex", background: "#c8e6c9", padding: "1rem" }}>
                    <div style={{ display: "flex", flex: 2, justifyContent: "center", flexDirection: "column", margin: "1rem" }}>
                        <h4 style={{ color: "#333" }}>短網址連結</h4>
                        <Input ref={urlDomRef} value={url} addonAfter={<span onClick={handleCopy}>複製</span>}></Input>
                    </div>
                    <div style={{ display: "flex", flex: 1, justifyContent: "center", margin: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
                            <div style={{ padding: "1rem", background: "white" }}>
                                <QRCode value={url}></QRCode>
                            </div>
                            <span style={{ color: "#333" }}>分享連結 QRCode</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                    <Button size='large' style={{ width: "48%", background: "#4caf50", color: "white" }}>查看我的短網址列表</Button>
                    <Button size='large' onClick={handleCreateNew} style={{ width: "48%", background: "#4caf50", color: "white" }}>建立新的短網址</Button>
                </div>
            </div>
        </div >
    );
};

export default Result;