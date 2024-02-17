import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/popup.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".places__list");

const popupEditProfile = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");

const popupImage = imgPopup.querySelector(".popup__image");
const popupCaption = imgPopup.querySelector(".popup__caption");

const profileEditForm = popupEditProfile.querySelector(".popup__form");
const newCardForm = cardPopup.querySelector(".popup__form");

const popupEditProfileCloseButton = popupEditProfile.querySelector(".popup__close");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close");
const imagePopupCloseButton = imgPopup.querySelector(".popup__close");

const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const descriptionInput = profileEditForm.querySelector(".popup__input_type_description");
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = newCardForm.querySelector(".popup__input_type_url");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


// Функция чтобы вывести карточки на страницу
function addCard(cardElement) {
  const newCard = createCard(cardElement, deleteCard, likeCard, showImage,);
  cardsList.append(newCard);
}
initialCards.forEach((cardElement) => {
  addCard(cardElement);
});

//Функция открытия и закрытия 
profileEditButton.addEventListener("click", () => { openPopup(popupEditProfile); nameInput.value = profileName.textContent; descriptionInput.value = profileDescription.textContent;});
profileAddButton.addEventListener("click", () => openPopup(cardPopup));
popupEditProfileCloseButton.addEventListener("click", () => closePopup(popupEditProfile));
cardPopupCloseButton.addEventListener("click", () => closePopup(cardPopup));
imagePopupCloseButton.addEventListener("click", () => closePopup(imgPopup));

//Функция редактирования профиля
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

//Функция добавления карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const newCardPopup = {
    name: newCardName.value,
    link: newCardLink.value,
  };

  const createNewCard = createCard(newCardPopup, deleteCard, likeCard, showImage);
  cardsList.prepend(createNewCard);
  newCardForm.reset();
  closePopup(cardPopup);
}
newCardForm.addEventListener("submit", handleFormCardSubmit);

// Функция отображения 
function showImage(imageSrc, captionText) {
  popupImage.src = imageSrc;
  popupImage.alt = captionText;
  popupCaption.textContent = captionText;
  openPopup(imgPopup);
}

