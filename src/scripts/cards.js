import { modalOpenImage } from "./index.js";
import { setPopupOpenEventListener } from "./modal.js";
import { removeCard, addLikeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
export function createCard(item, { deleteCard, likeCard, openImageCard, userId }) 
  {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardDeleteButton.addEventListener("click", deleteCard);
  cardElement.id = item._id;
  
  if (item.owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  const openModal = () => openImageCard(item);
  setPopupOpenEventListener(cardImage, modalOpenImage, openModal);
  const likeCount = item.likes.length || 0;
  const likeCountNode = cardElement.querySelector(".like-button__count");
  likeCountNode.textContent = likeCount;
  const likeButtonNode = cardElement.querySelector(".card__like-button");
  likeButtonNode.addEventListener("click", () =>
    likeCard(likeButtonNode, cardElement)
  );
  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButtonNode.classList.add("card__like-button_is-active");
  }
  return cardElement;
}

export function deleteCard(event) {
  const deletedCard = event.target.closest(".card");
  removeCard(deletedCard.id)
    .then(deletedCard.remove())
    .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
}

export async function handleLikeButton(likeButton, cardNode) {
  const isMyLikeOnCard = likeButton.classList.contains("card__like-button_is-active");
  const cardId = cardNode.id;
  const likeCountNode = cardNode.querySelector(".like-button__count");

  try {
    if (!isMyLikeOnCard) {
      const result = await addLikeCard(cardId, false);
      likeButton.classList.add("card__like-button_is-active");
      const likeCount = result.likes.length || 0;
      likeCountNode.textContent = likeCount;
    } else {
      const result = await addLikeCard(cardId, true);
      likeButton.classList.remove("card__like-button_is-active");
      const likeCount = result.likes.length || 0;
      likeCountNode.textContent = likeCount;
    }
  } catch (err) {
    console.error(`Ошибка: ${err}`);
  }
}

