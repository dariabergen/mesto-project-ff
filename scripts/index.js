// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardList = document.querySelector('.places__list');

function createCardElement(cardTitle, cardImage, onCardDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  cardImg.src = cardImage;
  cardImg.alt = cardTitle;
  cardTitleElement.textContent = cardTitle;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onCardDelete);
  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

function renderInitialCards(cardData) {
  cardData.forEach(({name, link}) => {
    const cardElement = createCardElement(name, link, deleteCard);
    cardList.appendChild(cardElement);
  });
}

renderInitialCards(initialCards);
