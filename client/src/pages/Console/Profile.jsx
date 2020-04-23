import React, { useContext } from 'react';
import UserProvider from '../../context/UserProvider'
import './Profile.css'
import { Input } from 'antd'
import ImageUploader from '../../components/ImageUploader/ImageUploader';
const Profile = () => {
    const user = useContext(UserProvider.context);

    return (
        <div style={{ maxWidth: "500px" }}>
            <h3>個人資料</h3>
            <div className="session" style={{ display: "flex", flexDirection: "column" }}>
                <span>上傳大頭貼</span>
                <img style={{ width: "7rem", height: "7rem" }} src={user.avatarsUrl}></img>
            </div>
            <div className="session">
                <ImageUploader style={{ fontSize: "16px" }}></ImageUploader>
            </div>
            <div className="session">
                <span>顯示名稱</span>
                <Input value={user.displayName}></Input>
            </div>
            <div className="session">
                <span>帳號</span>
                <Input value={user.username}></Input>
            </div>
            <div className="session">
                <span>email</span>
                <Input value={user.email}></Input>
            </div>
        </div>
    );
};

export default Profile;