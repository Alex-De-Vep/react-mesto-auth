import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, withRouter, useHistory} from 'react-router-dom';
import * as Auth from '../utils/Auth.js';
import Header from "./Header";
import Main from "./Main";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";

function App() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState("");
    const history = useHistory();

    useEffect(() => {
        Auth.getContent()
            .then((res) => {
                if (res) {
                    setUserLogin(res.email);
                    setLoggedIn(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        if (loggedIn) {
            history.push('/main');
        }
    }, [history, loggedIn])

    const onLogin = (value) => {
        setLoggedIn(value);
        setIsSuccess(value);
    }

    const updateUserLogin = (data) => {
        setUserLogin(data);
    }

    const openInfoToolTip = () => {
        setIsInfoToolTipOpen(true);
    }

    const closeInfoToolTip = () => {
        setIsInfoToolTipOpen(false);
        setIsSuccess(false);
    }

    const onSuccess = (data) => {
        setIsSuccess(data);
    }

    return (
        <div className="page">
            <Header login={userLogin}/>
            <Switch>
                <ProtectedRoute exact path="/main" loggedIn={loggedIn} component={Main}/>

                <Route path="/sign-in">
                    <Login onLogin={onLogin} updateLogin={updateUserLogin} openInfoToolTip={openInfoToolTip} />
                </Route>

                <Route path="/sign-up">
                    <Register openInfoToolTip={openInfoToolTip} isRegister={onSuccess} />
                </Route>

                <Route exact path="/">
                    {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/>}
                </Route>
            </ Switch>
            <InfoToolTip isSuccess={isSuccess} isOpen={isInfoToolTipOpen} onClose={closeInfoToolTip}/>
        </div>
    );
}

export default withRouter(App);
