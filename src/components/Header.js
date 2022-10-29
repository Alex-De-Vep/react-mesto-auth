import React, {useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import logo from "../images/logo.svg";

function Header({login}) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpened(!isMenuOpened);
    }

    const location = useLocation();
    const history = useHistory();

    function signOut(){
        localStorage.removeItem('jwt');
        setIsMenuOpened(false);
        history.push('/sign-in');
    }

    return (
        <header className="header">
            <div className={`header__menu ${isMenuOpened ? 'header__menu_opened' : ''}`}>
                <div className="header__menu-container">
                    <p className="header__login">{login}</p>
                    <button className="header__button" onClick={signOut}>Выйти</button>
                </div>
            </div>
            <div className="header__container">
                <img className="header__logo" src={logo} alt="Логотип mesto" />
                {
                    location.pathname !== "/sign-up" && location.pathname !== "/sign-in" &&
                    <>
                        <div className="header__nav">
                            <p className="header__login">{login}</p>
                            <button className="header__button" onClick={signOut}>Выйти</button>
                        </div>
                        <button onClick={toggleMenu} className={`header__burger ${isMenuOpened ? 'header__burger_close' : ''}`}></button>
                    </>
                }
                {location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link">Войти</Link>}
                {location.pathname === "/sign-in" && <Link to="/sign-up" className="header__link">Регистрация</Link>}
            </div>
        </header>
    );
}

export default Header;
