import React, { useState } from 'react';
import * as Auth from '../../utils/Auth.js';
import { Link, withRouter, useHistory } from 'react-router-dom';
import InfoToolTip from "../InfoTooltip";

function Register(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
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

        if (password !== ""){
            Auth.register(login, password)
                .then((res) => {
                    if (res.data._id) {
                        setIsRegister(true);
                        setIsInfoToolTipOpen(true);
                        history.push('/sign-in');
                    } else {
                        setIsRegister(false);
                        setIsInfoToolTipOpen(true);
                    }
                })
                .finally(() => {
                    setIsInfoToolTipOpen(true);
                })
        }
    }

    return(
        <>
            <div className="auth">
                <div className="auth__container">
                    <form onSubmit={handleSubmit} className="form">
                        <h1 className="form__title">
                            Регистрация
                        </h1>
                        <input type="email" className="form__input" value={login} onChange={handleChange} name="login" id="login" minLength="2" maxLength="40" required
                               aria-label="Email:" placeholder="Email:" />
                        <span className="form__input-error form__name-error"></span>
                        <input type="password" className="form__input" value={password} onChange={handleChange} name="password" id="password" minLength="2" maxLength="200" required
                               aria-label="Пароль" placeholder="Пароль"/>
                        <span className="form__input-error form__about-error"></span>
                        <button type="submit" className="form__button">Зарегистрироваться</button>
                    </form>
                    <div className="auth__sign-in">
                        <p className="auth__text">Уже зарегистрированы?&nbsp;
                            <Link to="/sign-in" className="auth__link">Войти</Link>
                        </p>
                    </div>
                </div>
            </div>
            <InfoToolTip isSuccess={isRegister} isOpen={isInfoToolTipOpen} onClose={closeInfoToolTip} />
        </>
    )
}

export default withRouter(Register);