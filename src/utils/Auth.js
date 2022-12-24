export const BASE_URL = 'https://api.super.students.nomoredomains.club';

const getResponseData = (response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    return response.json();
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
    })
        .then((res) => {
            return getResponseData(res);
        });
};

export const authorize = (login, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email: login, password})
    })
        .then((res) => {
            return getResponseData(res);
        });
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then((res) => {
            return getResponseData(res);
        });
}