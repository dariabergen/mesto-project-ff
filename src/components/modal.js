export { openModal, closeModal };

const clickClosePopup = (event) => {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
};
const escapeClosePopup = (event) => {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
};

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeClosePopup);
  popup.removeEventListener("click", clickClosePopup);
}

function openModal(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", escapeClosePopup);
  popup.addEventListener("click", clickClosePopup);
}

