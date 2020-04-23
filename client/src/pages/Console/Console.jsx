import React, { useContext, useEffect } from 'react';
import ShortLinkList from './ShortLinkList';
import UserProvider from '../../context/UserProvider';
import MenuBarStatusProvider from '../../context/MenuBarStatusProvider'
import './Console.css'
import { Input, Button } from 'antd'
import history from '../../history';
import { Link, useParams } from 'react-router-dom';
import Profile from './Profile';
import MySpace from './MySpace';
const Console = () => {
    const {
        setIsHaveSideMenu,
        isDisplay,
        setIsDisplay
    } = useContext(MenuBarStatusProvider.context)
    const user = useContext(UserProvider.context);
    const { tabName } = useParams()

    useEffect(() => {
        setIsHaveSideMenu(true)
        setIsDisplay(true)
        return () => {
            setIsHaveSideMenu(false)
        }
    }, [user])

    return (
        <div style={{ display: "flex" }}>
            <div className="side-panel" style={{ width: isDisplay ? "300px" : "0px", padding: isDisplay ? "1rem" : "0" }} >
                {isDisplay &&
                    <React.Fragment>
                        <div style={{ padding: "1rem 3rem 1rem 3rem" }}>
                            <img style={{ maxWidth: "100%", height: "auto" }} src={user.avatarsUrl}></img>
                        </div>
                        <Input value={user.displayName}></Input>
                        <div style={{ margin: "1rem 0rem", borderTop: "1px solid #ccc" }}></div>
                        <Button style={{ margin: "1rem 0" }} onClick={() => history.push("/")}>建立縮網址</Button>
                        <div className={`link ${tabName === "profile" ? "link-select" : ""}`}>
                            <Link to="/console/profile">個人資料</Link>
                        </div>
                        <div className={`link ${tabName === "myShrinkUrl" ? "link-select" : ""}`}>
                            <Link to="/console/myShrinkUrl">我的縮網址</Link>
                        </div>
                        <div className={`link ${tabName === "mySpace" ? "link-select" : ""}`}>
                            <Link to="/console/mySpace">空間管理</Link>
                        </div>
                    </React.Fragment>
                }
            </div>
            <div style={{ padding: "1rem", width: "100%", height: "100vh" }}>
                {tabName == "profile" &&
                    <Profile></Profile>
                }
                {tabName == "myShrinkUrl" &&
                    <ShortLinkList></ShortLinkList>
                }
                {tabName == "mySpace" &&
                    <MySpace></MySpace>
                }
            </div>
        </div>
    );
};

export default Console;