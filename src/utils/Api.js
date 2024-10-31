class Api {
    constructor(config) {
        this._url = config.url;
    }
    _check(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject("Произошла ошибка");
        }
    }
    getCardsUser() {
        return fetch(`${this._url}/usercard`, {
          credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => {
            return this._check(res)

        });
    }

    addCard({ name, arc, razm, colors, difficulty, imgFile, imgArc }) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('arc', arc);
        formData.append('razm', razm);
        formData.append('colors', colors);
        formData.append('difficulty', difficulty);
        formData.append('img', imgFile); // файл изображения
        formData.append('imgArc', imgArc);

        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            credentials: 'include',
            body: formData, // Используем formData для отправки файла
        }).then((res) => {
            return this._check(res);
        });
    }

    patchCard({name, arc, razm, colors, difficulty, imgFile, imgArc }, id) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('arc', arc);
        formData.append('razm', razm);
        formData.append('colors', colors);
        formData.append('difficulty', difficulty);
        imgFile && formData.append('img', imgFile);
        imgArc && formData.append('imgArc', imgArc);

        return fetch(`${this._url}/cards/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            credentials: 'include',
            body: formData, // Используем formData для отправки файла
        }).then((res) => {
            return this._check(res);
        });
    }


    deleteCard(ids) {
        return fetch(`${this._url}/cards`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                ids: Array.isArray(ids) ? ids : [ids], // Проверяем, массив ли ids, и приводим к массиву, если это не так
            }),
        }).then((res) => {
            return this._check(res);
        });
    }
    
}

const api = new Api({
    url: 'https://vandalvisionteam-vandalvision-server-7ee0.twc1.net',
})

export default api;