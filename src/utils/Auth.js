

export default class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _check(res) {
    if (res.status === 201) {
      return res.json();
    } else {
      return Promise.reject("Произошла ошибка");
    }
  }

  register(password, login) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        login: login,
      }),
    })
      .then((response) => {
        return this._check(response);
      })
      .then((res) => {
        return res;
      });
  }

  authorize(password, login) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        login: login,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return data;
        }
      });
  }

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  getUsers() {
    return fetch(`${this._url}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  patchUserPass(password ,id) {
    return fetch(`${this._url}/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  patchUserAdmins(admins ,id) {
    return fetch(`${this._url}/users/${id}/admins`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        admins: admins,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  deleteUser(id) {
    return fetch(`${this._url}/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
}

export const vandalAuth = new Auth({
  url: "https://vandalvisionteam-vandalvision-server-7ee0.twc1.net",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
