import React from 'react';
import * as Auth from '../../utils/Auth.js';
import { Link, withRouter } from 'react-router-dom';
import InfoToolTip from "../InfoTooltip";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            isInfoToolTipOpen: false,
            isRegister: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeInfoToolTip = this.closeInfoToolTip.bind(this);
    }

    closeInfoToolTip() {
        this.setState({
            isInfoToolTipOpen: false
        });
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.password){
            Auth.register(this.state.login, this.state.password)
                .then((res) => {
                    if (res.data._id) {
                        this.setState({
                            isRegister: true
                        });
                    } else {
                        this.setState({
                            isRegister: false
                        });
                    }
                })
                .finally(() => {
                    this.setState({
                        isInfoToolTipOpen: true
                    });
                })
        }
    }

    render(){
        return(
            <>
                <div className="auth">
                    <div className="auth__container">
                        <form onSubmit={this.handleSubmit} className="form">
                            <h1 className="form__title">
                                Регистрация
                            </h1>
                            <input type="email" className="form__input" value={this.state.login} onChange={this.handleChange} name="login" id="login" minLength="2" maxLength="40" required
                                   aria-label="Email:" placeholder="Email:" />
                            <span className="form__input-error form__name-error"></span>
                            <input type="password" className="form__input" value={this.state.password} onChange={this.handleChange} name="password" id="password" minLength="2" maxLength="200" required
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
                <InfoToolTip isSuccess={this.state.isRegister} isOpen={this.state.isInfoToolTipOpen} onClose={this.closeInfoToolTip} />
            </>
        )
    }
}

export default withRouter(Register);