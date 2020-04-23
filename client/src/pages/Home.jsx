import React, { useState } from 'react';
import axios from 'axios';
// import component
import { Input, Button, message } from 'antd'
import history from '../history';
import SubmitTab from '../components/SubmitTab/SubmitTab';
const Home = () => {
    const [data, setData] = useState("");

    const handleSubmit = async () => {
        let response = await axios.post("/api/link", data)
        if (response.status === 200) {
            message.success(response.data.message)
            history.push(`/result/${response.data.data._id}`)
        } else {
            message.error(response.data.message)
        }
    }

    const handleDataChange = (data) => {
        console.log(setData)
        setData(data)
    }
    return (
        <div className="container" style={{ marginTop: "3rem" }}>
            <SubmitTab onChange={handleDataChange}></SubmitTab>
            <Button size='large' style={{ background: "#4caf50", color: "white", width: "100%" }} onClick={handleSubmit}>送出</Button>
        </div>
    );
};

export default Home;