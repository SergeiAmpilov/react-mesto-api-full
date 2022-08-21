class Auth {
    constructor() {
        this._baseUrl = 'https://auth.nomoreparties.co/';
    }

    _request(path = "", body = false, method = 'GET', token = false) {

        const reqObject = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            reqObject.headers['Authorization'] = `Bearer ${token}`;
        }

        if (body) {
            reqObject.body = JSON.stringify(body);
        }

        return fetch(`${this._baseUrl}${path}`, reqObject)
                .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }


    /* регистрация пользователя */
    signUp(email, password) {
        return this._request('signup', {email, password}, 'POST');
    }

    /* авторизация пользователя */
    signIn(email, password) {
        return this._request('signin', {email, password}, 'POST');
    }

    /* проверка валидности токена */
    checkToken(token) {
        return this._request('users/me', false, 'GET', token);
    }
}


const auth = new Auth();

export default auth;