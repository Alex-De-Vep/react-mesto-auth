import React from 'react';
import * as Auth from '../../utils/Auth.js';
import { withRouter } from 'react-router-dom';
import InfoToolTip from "../InfoTooltip";

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            login: '',
            password: '',
            isAuth: false,
            isInfoToolTipOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeInfoToolTip = this.closeInfoToolTip.bind(this);
        this.loggedIn = props.onLogin;
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
        if (!this.state.login || !this.state.password){
            return;
        }

        Auth.authorize(this.state.login, this.state.password)
            .then((data) => {
                if (data){
                    this.setState({login: '', password: ''} ,() => {
                        this.loggedIn(true);
                        this.props.history.push('/main');
                    })
                } else {
                    this.setState({
                        isInfoToolTipOpen: true
                    });
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    isInfoToolTipOpen: true
                });
            });
    }

    render(){
        return(
            <>
                <div className="auth">
                    <div className="auth__container">
                        <form onSubmit={this.handleSubmit} className="form">
                            <h1 className="form__title">
                                Вход
                            </h1>
                            <input type="email" className="form__input" value={this.state.login} onChange={this.handleChange} name="login" id="login" minLength="2" maxLength="40" required
                                   aria-label="Email:" placeholder="Email:" />
                            <span className="form__input-error form__name-error"></span>
                            <input type="password" className="form__input" value={this.state.password} onChange={this.handleChange} name="password" id="password" minLength="2" maxLength="200" required
                                   aria-label="Пароль" placeholder="Пароль"/>
                            <span className="form__input-error form__about-error"></span>
                            <button type="submit" className="form__button">Войти</button>
                        </form>
                    </div>
                </div>
                <InfoToolTip isSuccess={this.state.isAuth} isOpen={this.state.isInfoToolTipOpen} onClose={this.closeInfoToolTip} />
            </>
        )
    }
}

export default withRouter(Login); 