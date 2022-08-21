import React from 'react';
import { Link, Route } from "react-router-dom";


import headerLogo from '../images/header-logo.svg';

function Header({loggedIn, userEmail, handleLogout}) {
    
    const linkClick = (evt) => {
        evt.preventDefault();
        handleLogout();
    }

    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип Место" className="header__logo"/>
            <nav className="header__group">
                
                { loggedIn && (
                    <>
                        <p className="header__email">{userEmail}</p>
                        <a className="header__link" href="" onClick={handleLogout}>Выйти</a>
                    </>
                )}


                <Route path="/sign-in">
                    <Link to="/sign-up" className='header__link'>Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className='header__link'>Войти</Link>
                </Route>
            </nav>
        </header>
    );
}

export default Header; 