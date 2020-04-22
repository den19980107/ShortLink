import React, { useState } from 'react';
import axios from 'axios';
// import component
import { Input, Button, message } from 'antd'
const Home = () => {
    const [url, setUrl] = useState("");
    const handleUrlChange = (e) => {
        setUrl(e.target.value)
    }
    const handleSubmit = async () => {
        let response = await axios.post("/api/link", {
            url
        })
        console.log(response)
        if (response.status === 200) {
            message.success(response.data.message)
        } else {
            message.error(response.data.message)
        }
    }
    return (
        <div className="container" style={{ marginTop: "3rem" }}>
            <h3>縮短網址</h3>
            <Input value={url} onChange={handleUrlChange}></Input>
            <Button onClick={handleSubmit}>送出</Button>
        </div>
    );
};

export default Home;