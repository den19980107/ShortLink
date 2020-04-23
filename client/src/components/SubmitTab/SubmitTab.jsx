import React from 'react';
import { Input } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import './SubmitTab.css'

import ImageUploader from '../ImageUploader/ImageUploader'
import VideoUploader from '../VideoUploader/VideoUploader'
import FileUploader from '../FileUploader/FileUploader';

// import icon
import LanguageIcon from '@material-ui/icons/Language';
import PhotoIcon from '@material-ui/icons/Photo';
import YouTubeIcon from '@material-ui/icons/YouTube';
import AttachmentIcon from '@material-ui/icons/Attachment';
import RoomIcon from '@material-ui/icons/Room';

const SubmitTab = ({ onChange }) => {
    const [data, setData] = useState({ type: null, value: "" });
    const [inputUrl, setInputUrl] = useState("");
    const [inputLocation, setInputLocation] = useState("");

    const [key, setKey] = useState("url")
    const handleUrlChange = (e) => {
        setInputUrl(e.target.value)
        setData({
            type: "url",
            url: e.target.value
        })
    }
    const handleImageUpload = (url) => {
        setData({
            type: "image",
            url: url
        })
    }
    const handelVideoUpload = (url) => {
        setData({
            type: "video",
            url: url
        })
    }

    const handleFileUpload = (url) => {
        setData({
            type: "file",
            url: url
        })
    }
    const handleLocationChange = (e) => {
        let locationString = e.target.value;
        setInputLocation(locationString)
        let locationArray = locationString.split()
        let queryString = "";
        for (let i = 0; i < locationArray.length; i++) {
            queryString += `+${locationArray[i]}`
        }
        setData({
            type: "location",
            url: `https://www.google.com/maps/search/?api=1&query=${queryString}`
        })
    }
    const changeTab = (key) => {
        setKey(key)
    }
    useEffect(() => {
        onChange(data);
    }, [data])
    return (
        <div style={{ background: "white" }}>
            <div className="tabContainer">
                <div className="tabItemContainer">
                    <div className={key == "url" ? "tabItem-active" : "tabItem"} onClick={() => changeTab("url")}>
                        <span><LanguageIcon></LanguageIcon>網址</span>
                    </div>
                </div>
                <div className="tabItemContainer">
                    <div className={key == "image" ? "tabItem-active" : "tabItem"} onClick={() => changeTab("image")}>
                        <span><PhotoIcon></PhotoIcon>照片</span>
                    </div>
                </div>
                <div className="tabItemContainer">
                    <div className={key == "video" ? "tabItem-active" : "tabItem"} onClick={() => changeTab("video")}>
                        <span><YouTubeIcon></YouTubeIcon>影片</span>
                    </div>
                </div>
                <div className="tabItemContainer">
                    <div className={key == "file" ? "tabItem-active" : "tabItem"} onClick={() => changeTab("file")}>
                        <span><AttachmentIcon></AttachmentIcon>檔案</span>
                    </div>
                </div>
                <div className="tabItemContainer">
                    <div className={key == "location" ? "tabItem-active" : "tabItem"} onClick={() => changeTab("location")}>
                        <span><RoomIcon></RoomIcon>地址</span>
                    </div>
                </div>
            </div>
            <div style={{ padding: "1rem 1rem 2rem 1rem" }}>
                {key === "url" &&
                    <div>
                        <h3>縮短網址</h3>
                        <Input value={inputUrl} onChange={handleUrlChange} placeholder="目標網址"></Input>
                    </div>
                }
                {key === "image" &&
                    <div>
                        <h3>縮短照片</h3>
                        <ImageUploader style={{ fontSize: "16px" }} onChange={handleImageUpload}></ImageUploader>
                    </div>
                }
                {key === "video" &&
                    <div>
                        <h3>縮短影片</h3>
                        <VideoUploader style={{ fontSize: "16px" }} onChange={handelVideoUpload}></VideoUploader>
                    </div>
                }
                {key === "file" &&
                    <div>
                        <h3>縮短檔案</h3>
                        <FileUploader style={{ fontSize: "16px" }} onChange={handleFileUpload}></FileUploader>
                    </div>
                }
                {key === "location" &&
                    <div>
                        <h3>縮短地址</h3>
                        <Input value={inputLocation} onChange={handleLocationChange} placeholder="請在這邊輸入地址或是該建築名稱"></Input>
                    </div>
                }
            </div>
        </div>
    );
};

export default SubmitTab;