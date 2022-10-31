import React, {useState} from 'react';
import * as Auth from '../../utils/Auth.js';
import { withRouter, useHistory } from 'react-router-dom';
import InfoToolTip from "../InfoTooltip";

function Login({onLogin, updateLogin}) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [isAuth] = useState(false);
    const history = useHistory();

    const closeInfoToolTip = () => {
        setIsInfoToolTipOpen(false);
    }

    const handleChange = (e) => {
        if (e.target.name === "login") {
            setLogin(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!login || !password){
            return;
        }

        Auth.authorize(login, password)
            .then((data) => {
                if (data.token){
                    localStorage.setItem('jwt', data.token);
                    updateLogin(login);
                    onLogin(true);
                    setPassword("");
                    setLogin("");
                    history.push('/main');
                } else {
                    setIsInfoToolTipOpen(true);
                }
            })
            .catch((err) => {
                console.log(err)

                setIsInfoToolTipOpen(true);
            });
    }

    return(
        <>
            <div className="auth">
                <div className="auth__container">
                    <form onSubmit={handleSubmit} className="form">
                        <h1 className="form__title">
                            Вход
                        </h1>
                        <input type="email" className="form__input" value={login} onChange={handleChange} name="login" id="login" minLength="2" maxLength="40" required
                               aria-label="Email:" placeholder="Email:" />
                        <span className="form__input-error form__name-error"></span>
                        <input type="password" className="form__input" value={password} onChange={handleChange} name="password" id="password" minLength="2" maxLength="200" required
                               aria-label="Пароль" placeholder="Пароль"/>
                        <span className="form__input-error form__about-error"></span>
                        <button type="submit" className="form__button">Войти</button>
                    </form>
                </div>
            </div>
            <InfoToolTip isSuccess={isAuth} isOpen={isInfoToolTipOpen} onClose={closeInfoToolTip} />
        </>
    )
}

export default withRouter(Login); 