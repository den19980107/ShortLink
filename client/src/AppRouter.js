import React, { Component } from 'react';

import { Router, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import history from "./history";

import MenuBar from './components/MenuBar/MenuBar'
import Home from "./pages/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Result from './pages/Result/Result';

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
                    <Route path="/" component={MenuBar} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/result/:id" component={Result} />
                </UserProvider>

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Router>
        )
    }
}


export default AppRouter;