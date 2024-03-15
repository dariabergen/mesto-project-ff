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

  popupNode.querySelector(".popup__content").addEventListener("click", function(event) {
    if (event.target === this) {
      handleCloseModal(popupNode);
    }
  });

  popupNode.addEventListener("click", () => handleCloseModal(popupNode));
};



