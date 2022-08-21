import React from 'react';

import { Link } from "react-router-dom";

function Register({onRegister}) {


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (evt) => setEmail(evt.target.value);
    const handleChangePassword = (evt) => setPassword(evt.target.value);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(email, password);
    }

    return (
        
            
        <main>
            <section className="login">
                <h1 className="login__title">Регистрация</h1>
                    <form className="login__form" name="login" onSubmit={handleSubmit}>
                        <label className="popup__form-group">
                            <input type="email"
                                name="email"
                                placeholder="Email"
                                className="login__form-field"
                                required=""
                                onChange={handleChangeEmail}
                                value={email}
                                id="email-input" />
                        </label>
                        <label className="popup__form-group">
                            <input type="password"
                                name="password"
                                placeholder="Пароль"
                                className="login__form-field"
                                required=""
                                onChange={handleChangePassword}
                                value={password}
                                id="password-input"
                            />
                        </label>
                        <button type="submit" className="login__button-submit">Зарегистрироваться</button>
                        <p className="login__text">
                            Уже зарегистрированы? <Link to="/sign-in" className="login__footer-link">Войти</Link>
                        </p>
                        
                    </form>
            </section>
        </main>
            
        
        
    );
}

export default Register;