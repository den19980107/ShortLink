import React from 'react';
import { useEffect, useContext } from 'react';
import UserProvider from '../../context/UserProvider';
import axios from 'axios';
import QRCode from 'qrcode.react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Table, Menu, Dropdown, Input, message, Modal } from 'antd'
import config from '../../config/default';
import { useState } from 'react';

const { Search } = Input;

const ShortLinkList = () => {
    const [myShortLinks, setMyShortLinks] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [nowEditRecord, setNowEditRecord] = useState(null);
    const user = useContext(UserProvider.context);

    useEffect(() => {
        getMyShortLinks();
    }, [user])

    useEffect(() => {
        setDisplayData(filterData())
    }, [searchWord, myShortLinks])

    const getMyShortLinks = async () => {
        if (user._id) {
            let { data } = await axios.get("/api/user/getMyShrinkLink");
            setMyShortLinks(data)
        }
    }

    const columns = [
        {
            title: '網址',
            dataIndex: '_id',
            key: '_id',
            render: id => {
                return <a href={`${config.serverUrl}/${id}`}>{`${config.serverUrl}/${id}`}</a>
            },
        },
        {
            title: '短網址類型',
            dataIndex: 'type',
            key: 'type',
            render: type => {
                let displayString = "";
                switch (type) {
                    case "file":
                        displayString = "檔案"
                        break;
                    case "video":
                        displayString = "影片"
                        break;
                    case "image":
                        displayString = "圖片"
                        break;
                    case "location":
                        displayString = "位址"
                        break;
                    case "url":
                        displayString = "網址"
                        break;
                }
                return <span>{displayString}</span>
            },
        },
        {
            title: '原始連結',
            dataIndex: 'originalData',
            key: 'originalData',
        },
        {
            title: '點擊數',
            dataIndex: 'history',
            key: 'history',
            render: history => {
                return <span>{history && history.length}</span>
            },
        },
        {
            title: '動作',
            key: 'action',
            render: (text, record) => (
                <Dropdown overlay={menu} trigger={['click']} onClick={() => setNowEditRecord(record)}>
                    <MoreVertIcon></MoreVertIcon>
                </Dropdown>
            ),
        },
    ];

    const handleShowQRcode = () => {
        console.log(nowEditRecord)
        Modal.info({
            title: 'QRCode',
            content: (
                <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                    <QRCode value={`${config.serverUrl}/${nowEditRecord._id}`}></QRCode>
                </div>
            ),
            onOk() { },
        });
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={handleShowQRcode}>
                <span>QRCode</span>
            </Menu.Item>
            <Menu.Item>
                <span>檢視數據</span>
            </Menu.Item>
            <Menu.Item>
                <span>編輯連結</span>
            </Menu.Item>
            <Menu.Item>
                <span>刪除連結</span>
            </Menu.Item>
        </Menu>
    );

    const filterData = () => {
        if (!myShortLinks) return []
        if (!searchWord || searchWord === "") return myShortLinks
        return myShortLinks.filter((shortLink) => {
            let result = false
            if (shortLink._id && typeof shortLink._id == "string") {
                result = result || shortLink._id.includes(searchWord)
            }
            if (shortLink.type && typeof shortLink.type == "string") {
                result = result || shortLink.type.includes(searchWord)
            }
            if (shortLink.originalData && typeof shortLink.originalData == "string") {
                result = result || shortLink.originalData.includes(searchWord)
            }
            return result
        })
    }
    return (
        <div style={{ marginTop: "1rem" }}>
            <h3>管理我的短網址</h3>
            <Search
                placeholder="透過標題搜尋短網址"
                onSearch={(e) => setSearchWord(e)}
                style={{ width: "30%", margin: "1rem 0" }}
            />
            <Table style={{ background: "white", width: "100%" }} scroll={{ x: 500, y: 300 }} dataSource={displayData} columns={columns} />
        </div>
    );
};

export default ShortLinkList;
