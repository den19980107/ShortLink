import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import ipLocation from 'iplocation';

import { Table } from 'antd'
import Map from './Map';
import ClickPerDay from './ClickPerDay';
const Reports = () => {
    let { id } = useParams();
    let [history, setHistory] = useState(null);
    useEffect(() => {
        getResponse();
    }, [])
    const getResponse = async () => {
        let response = await axios.get(`/api/link/reports/${id}`);
        console.log(response)
        if (response.status === 200) {
            let data = response.data.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].fromIP === "::1") continue;
                try {
                    let location = await ipLocation(data[i].fromIP);
                    data[i].location = location
                } catch (e) {
                    console.log(e)
                }
            }
            setHistory(response.data.data)
        }
    }
    const columns = [
        {
            title: '客戶端名稱',
            dataIndex: 'client_name',
            key: 'client_name',
        },
        {
            title: '客戶端類型',
            dataIndex: 'client_type',
            key: 'client_type',
        },
        {
            title: '客戶端版本',
            dataIndex: 'client_version',
            key: 'client_version',
        }, {
            title: '裝置品牌',
            dataIndex: 'device_brand',
            key: 'device_brand',
        }, {
            title: '裝置型號',
            dataIndex: 'device_model',
            key: 'device_model',
        }, {
            title: '裝置類型',
            dataIndex: 'device_type',
            key: 'device_type',
        },
        {
            title: 'ip',
            dataIndex: 'fromIP',
            key: 'fromIP',
        },
        {
            title: '作業系統名稱',
            dataIndex: 'os_name',
            key: 'os_name',
        },
        {
            title: '裝置平台',
            dataIndex: 'os_platform',
            key: 'os_platform',
        },
        {
            title: '裝置版本',
            dataIndex: 'os_version',
            key: 'os_version',
        }
    ];

    return (
        <div className="container" style={{ marginTop: "3rem" }}>
            <div style={{ padding: "1rem", background: "white" }}>
                {history ?
                    <React.Fragment>
                        <Table dataSource={history} columns={columns} />
                        <div style={{ width: "100%", margin: "1rem 0 2rem 0" }}>
                            <h3>每日點擊量</h3>
                            <div style={{ height: "500px" }}>
                                <ClickPerDay datas={history}></ClickPerDay>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div>
                                <h3>流量來源</h3>
                                <div style={{ width: "500px", height: "500px" }}>
                                    <Map datas={history}></Map>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <h1>loading..</h1>
                }
            </div>
        </div>
    );
};

export default Reports;