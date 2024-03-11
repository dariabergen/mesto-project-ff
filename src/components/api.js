const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "e919465f-8f9c-4b5a-875b-c02aa63306ca",
    "Content-Type": "application/json",
  },
};

//Проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе 
const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

//Загрузка карточек 
const getCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const getData = () => {
  return Promise.all([getUserData(), getCard()]);
};

//Редактирование профиля сохранения
export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
};

//Отправляем новую карточку на сервер
export const updateCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

// Запрос на удаление карточки
export const deleteCardId = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

//Работа лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Обновление аватара пользователя
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
};

