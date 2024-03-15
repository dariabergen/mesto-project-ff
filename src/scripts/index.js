import "../pages/index.css";
import { createCard, deleteCard, handleLikeButton } from "./card";
import { clearValidation } from "./validation";
import { getCard, getProfile, updateProfile, updateCard, updateAvatar } from "./api";

export const modalOpenImage = document.querySelector(".popup_type_image");
const buttonPlus = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const modalEditProfile = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const buttonAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type-avatar");
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
export let userId = "";
let userAvatar = "";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserData()])
  .then(([initialCards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profTitle.textContent = userData.name;
    profDesc.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((item) => {
      const cardItem = createCard(item, {
        deleteCard,
        likeCard: handleLikeButon,
        openImageCard: openImageModal,
        userId,
      });
      placesList.append(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export const setPopupOpenEventListener = (openButton, popupNode, ...popups) => {
  openButton.addEventListener("click", () => {
    handleOpenModal(popupNode);
    popups.forEach((popup) => clearValidation(popup, validationSettings));
  });
};

const imageModal = document.querySelector(".popup__image");
const imageModalCaption = document.querySelector(".popup__caption");
const openImageModal = (item) => {
  imageModal.src = item.link;
  imageModal.alt = item.name;
  imageModalCaption.textContent = item.name;
};

const popupEdit = document.querySelector(".popup_type_edit");
const profileFormElement = popupEdit.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");
function fillProfileInputs() {
  nameInput.value = profTitle.textContent;
  jobInput.value = profDesc.textContent;
}

function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}
export function handleEditProfile(userData) {
  function handleProfileFormSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    patchUserData(userData)
      .then((data) => {
        const name = data.name;
        const job = data.about;
        profTitle.textContent = name;
        profDesc.textContent = job;
        evt.target.reset();
        handleCloseModal(popupEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
}

const popupNewCard = document.querySelector(".popup_type_new-card");

export function handleAddCard(createCard, deleteCard, placesList) {
  const newCardFormElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = newCardFormElement.querySelector(
    ".popup__input_type_url"
  );
handleAddCard()

  function handleFormNewCardSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };
    updateCard(card)
      .then((card) => {
        const cardItem = createCard(card, {
          deleteCard,
          likeCard: handleLikeButton,
          openImageCard: openImageModal,
          userId,
        });
        placesList.prepend(cardItem);
        handleCloseModal(popupNewCard);
        cardNameInput.value = "";
        cardUrlInput.value = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}

function handleEditAvatar() {
  const avatarFormElement = avatarPopup.querySelector(".popup__form");
  const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");
  function handleFormSubmitAvatar(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    updateAvatar({ avatar: avatarInput.value })
      .then((data) => {
        profileAvatar.style = `background-image: url(${data.avatar})`;
        userAvatar = data.avatar;
        handleCloseModal(avatarPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  avatarFormElement.addEventListener("submit", handleFormSubmitAvatar);
}
handleEditAvatar();
handleEditProfile();
setPopupCloseEventListener(modalNewCard);
setPopupCloseEventListener(modalEditProfile);
setPopupCloseEventListener(modalOpenImage);
setPopupCloseEventListener(avatarPopup);
setPopupOpenEventListener(buttonPlus, modalNewCard);
setPopupOpenEventListener(buttonEditProfile, modalEditProfile,fillProfileInputs);
setPopupOpenEventListener(buttonAvatar, avatarPopup);

