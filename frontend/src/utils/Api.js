class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
  }

  _handleSendReq(res) {
    if (res.ok) {
      return Promise.resolve(res.json())
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  async getUser() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  async getCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  async editProfileUser(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    return this._handleSendReq(response)
  }

  async updateAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this._handleSendReq(response)
  }

  async addCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    })
    return this._handleSendReq(response)
  }

  async deletedCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  async addLikeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  async deletedLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }
}

const api = new Api({
  baseUrl: "https://api.romzes2f.nomoredomainsrocks.ru",
})

export default api
