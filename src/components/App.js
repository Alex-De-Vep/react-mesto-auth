import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, withRouter, useHistory} from 'react-router-dom';
import * as Auth from '../utils/Auth.js';
import Header from "./Header";
import Main from "./Main";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            Auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setUserLogin(res.data.email);
                        setLoggedIn(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            history.push('/main');
        }
    }, [history, loggedIn])

    const onLogin = (value) => {
        setLoggedIn(value);
    }

    const updateUserLogin = (data) => {
        setUserLogin(data);
    }

    return (
            <div className="page">
                    <Header login={userLogin}/>
                    <Switch>
                        <ProtectedRoute exact path="/main" loggedIn={loggedIn} component={Main} />

                        <Route path="/sign-in">
                            <Login onLogin={onLogin} updateLogin={updateUserLogin} />
                        </Route>

                        <Route path="/sign-up">
                            <Register/>
                        </Route>

                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/>}
                        </Route>
                    </ Switch>
            </div>
    );
}

export default withRouter(App);
