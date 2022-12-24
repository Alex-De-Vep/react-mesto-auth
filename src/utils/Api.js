class Api {
    baseUrl;
    headers;
    avatar;

    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    }

    updateAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    toggleLike(cardId, isLiked) {
        const method = isLiked ? "PUT" : "DELETE";
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method,
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    addCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    updateUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
