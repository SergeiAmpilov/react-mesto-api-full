import React from 'react';

function Login({onLogin}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (evt) => setEmail(evt.target.value);
    const handleChangePassword = (evt) => setPassword(evt.target.value);

    const handleLogin = (evt) => {
        evt.preventDefault();
        onLogin(email, password);
    }

    return (
        <main>
            <section className="login">
                <h1 className="login__title">Вход</h1>
                    <form className="login__form" name="login" onSubmit={handleLogin}>
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
                        <button type="submit" className="login__button-submit">Войти</button>
                    </form>
            </section>
        </main>        
    );
}

export default Login;