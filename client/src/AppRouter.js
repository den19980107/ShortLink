import React, { Component } from 'react';

import { Router, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import MenuBarStatusProvider from './context/MenuBarStatusProvider';
import history from "./history";

import MenuBar from './components/MenuBar/MenuBar'
import Home from "./pages/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Result from './pages/Result/Result';
import Console from './pages/Console/Console';
import Reports from './pages/Reports/Reports';

class AppRouter extends Component {
    state = {
        isLogin: false,
        user: {}
    }

    componentDidMount() {
        fetch("/api/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                this.setState({
                    user: responseJson.user,
                    isLogin: true
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {

        return (
            <Router history={history}>
                <UserProvider>
                    <MenuBarStatusProvider>
                        <Route path="/" component={MenuBar} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/result/:id" component={Result} />
                        <Route exact path="/console" component={Console}></Route>
                        <Route path="/console/:tabName" component={Console}></Route>
                        <Route path="/reports/:id" component={Reports}></Route>
                    </MenuBarStatusProvider>
                </UserProvider>

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Router>
        )
    }
}


export default AppRouter;