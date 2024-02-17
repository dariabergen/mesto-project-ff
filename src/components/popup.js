export { openPopup, closePopup };

const clickClosePopup = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

const escapeClosePopup = (event) => {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".popup_is-opened");
    closePopup(openModal);
  }
};

function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeClosePopup);
  popup.removeEventListener("click", clickClosePopup);
};

function openPopup (popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", escapeClosePopup);
  popup.addEventListener("click", clickClosePopup);
};
