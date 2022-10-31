export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponseData = (response) => {
    try {
        if (response.status === 200 || response.status === 201) {
            return response.json();
        }
    } catch (e) {
        return (e)
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => {
            return getResponseData(res);
        })
        .catch((err) => console.log(err));
};

export const authorize = (login, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: login, password})
    })
        .then((res) => {
            return getResponseData(res);
        })
        .catch(err => console.log(err))
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            return getResponseData(res);
        })
        .catch(err => console.log(err));
}