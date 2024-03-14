import "../pages/index.css";
import { createCard, deleteCard, handleLikeButton } from "./cards";
import { setPopupOpenEventListener, openImageModal, handleEditProfile,
        handleAddCard, setPopupCloseEventListener, fillProfileInputs,
        handleEditAvatar, profTitle, profDesc, profileAvatar,
       } from "./modal";
import { enableValidation, validationSettings } from "./validation";
import { getCard, getProfile } from "./api";

export const modalOpenImage = document.querySelector('.popup_type_image');
const buttonPlus = document.querySelector('.profile__add-button');
const modalNewCard = document.querySelector('.popup_type_new-card');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');
const placesList = document.querySelector('.places__list');
const buttonAvatar = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type-avatar')
export let userId = "";
let userAvatar = "";

const fetchData = async () => {
    try {
      const [initialCards, userData] = await Promise.all([getCard(), getProfile()]);
      userAvatar = userData.avatar;
      userId = userData._id;
      profTitle.textContent = userData.name;
      profDesc.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  
      initialCards.forEach((item) => {
        const cardItem = createCard(item, {
          deleteCard,
          likeCard: handleLikeButton,
          openImageCard: openImageModal,
          userId,
        });
        placesList.append(cardItem);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
handleEditProfile();
handleEditAvatar();
handleAddCard(createCard, deleteCard, placesList);
setPopupCloseEventListener(modalNewCard);
setPopupCloseEventListener(modalEditProfile);
setPopupCloseEventListener(modalOpenImage);
setPopupCloseEventListener(avatarPopup);
setPopupOpenEventListener(buttonPlus, modalNewCard);
setPopupOpenEventListener(buttonEditProfile, modalEditProfile, fillProfileInputs);
setPopupOpenEventListener(buttonAvatar, avatarPopup);
enableValidation(validationSettings);
