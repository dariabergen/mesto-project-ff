import { handleLikeButton } from "./cards";
import { clearValidation, validationSettings } from "./validation";
import { updateProfile, updateCard, updateAvatar } from "./api";
import { userId } from "./index";

export const handleOpenModal = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseModalByEsc);
};

export const handleCloseModal = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseModalByEsc);
};

function handleCloseModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    handleCloseModal(openedPopup);
  }
}

export const setPopupCloseEventListener = (popupNode) => {
  const closeButton = popupNode.querySelector(".popup__close");
  closeButton.addEventListener("click", () => handleCloseModal(popupNode));

  popupNode
    .querySelector(".popup__content")
    .addEventListener("click", (evt) => evt.stopPropagation());
  popupNode.addEventListener("click", () => handleCloseModal(popupNode));
};

export const setPopupOpenEventListener = (openButton, popupNode, ...popups) => {
  openButton.addEventListener("click", () => {
    handleOpenModal(popupNode);
    popups.forEach(popup => clearValidation(popup, validationSettings));
  });
};

const imageModal = document.querySelector(".popup__image");
const imageModalCaption = document.querySelector(".popup__caption");
export const openImageModal = (item) => {
  imageModal.src = item.link;
  imageModal.alt = item.name;
  imageModalCaption.textContent = item.name;
};

const popupEdit = document.querySelector(".popup_type_edit");
const profileFormElement = popupEdit.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");
export const profTitle = document.querySelector(".profile__title");
export const profDesc = document.querySelector(".profile__description");
export function fillProfileInputs() {
  nameInput.value = profTitle.textContent;
  jobInput.value = profDesc.textContent;
}

function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}

export function handleEditProfile() {
  const handleProfileFormSubmit = (evt) => {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    updateProfile({ name: nameInput.value, about: jobInput.value })
      .then(() => {
        const name = nameInput.value;
        const job = jobInput.value;
        profTitle.textContent = name;
        profDesc.textContent = job;
        evt.target.reset();
        handleCloseModal(popupEdit);
      })
      .catch(console.log)
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  };
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
}

const popupNewCard = document.querySelector(".popup_type_new-card");
export function handleAddCard(createCard, deleteCard, placesList) {
  const newCardFormElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
  const cardUrlInput = newCardFormElement.querySelector(".popup__input_type_url");

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


const avatarPopup = document.querySelector(".popup_type-avatar");
export const profileAvatar = document.querySelector(".profile__image");
export function handleEditAvatar() {
  const avatarFormElement = avatarPopup.querySelector(".popup__form");
  const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");
  let userAvatar = "";

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



