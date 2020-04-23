import React, { useContext } from 'react';
import _ from "lodash";
import history from '../../history'
import { Link } from 'react-router-dom'
import UserProvider from '../../context/UserProvider';
import config from '../../config/default';
import './MenuBar.css'
//component
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap'
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar } from 'antd';
import { useEffect } from 'react';
import MenuBarStatusProvider from '../../context/MenuBarStatusProvider';
console.log("config = ", config)

const MenuBar = () => {
    const user = useContext(UserProvider.context);
    const {
        isHaveSideMenu,
        isDisplay,
        setIsDisplay
    } = useContext(MenuBarStatusProvider.context)
    const isLogin = !_.isEmpty(user) ? true : false;

    return (
        <Navbar bg="light" expand="lg">
            {isHaveSideMenu && <MenuIcon style={{ marginRight: "1rem" }} onClick={() => setIsDisplay(!isDisplay)}></MenuIcon>}
            <Navbar.Brand href="#home">Shirnk.Link</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isLogin &&
                        <React.Fragment>
                            <Nav.Link onClick={() => history.push('/')}>首頁</Nav.Link>
                        </React.Fragment>
                    }
                </Nav>
                <Form inline>
                    {isLogin ?
                        <React.Fragment>
                            <Avatar src={user.avatarsUrl} />
                            <NavDropdown title={user.displayName} style={{ marginRight: "1rem" }} id="nav-dropdown" >
                                <NavDropdown.Item><Link style={{ color: "black" }} to="/console">管理後台</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`${config.serverUrl}/api/auth/logout`} style={{ color: "black" }}>登出</NavDropdown.Item>
                            </NavDropdown>

                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Nav.Link><Link to="/login" style={{ color: "black" }}>登入</Link></Nav.Link>
                            <Nav.Link><Link to="/register" style={{ color: "black" }}>註冊</Link></Nav.Link>
                        </React.Fragment>
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MenuBar;