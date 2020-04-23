import React from 'react';
import { useEffect, useContext } from 'react';
import UserProvider from '../../context/UserProvider';
import axios from 'axios';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Table, Menu, Dropdown, Input } from 'antd'
import config from '../../config/default';
import { useState } from 'react';

const { Search } = Input;

const ShortLinkList = () => {
    const [myShortLinks, setMyShortLinks] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [searchWord, setSearchWord] = useState("");
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
                return <a>{`${config.serverUrl}/${id}`}</a>
            },
        },
        {
            title: '短網址類型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '原始連結',
            dataIndex: 'originalData',
            key: 'originalData',
        },
        {
            title: '點擊數',
            dataIndex: '',
            key: '',
        },
        {
            title: '動作',
            key: 'action',
            render: (text, record) => (
                <Dropdown overlay={menu} trigger={['click']}>
                    <MoreVertIcon></MoreVertIcon>
                </Dropdown>
            ),
        },
    ];

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    QRCode
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    檢視數據
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    編輯連結
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    刪除連結
            </a>
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
            <Table style={{ background: "white" }} dataSource={displayData} columns={columns} />
        </div>
    );
};

export default ShortLinkList;
