class Popup {
  constructor({ popupSelector, openBtnSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._popupCloseBtnEl = this._popupEl.querySelector(".popup__close");
    this._openBtnEl = document.querySelector(openBtnSelector);
  }

  open() {
    this._popupEl.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose.bind(this));
  }

  close() {
    this._popupEl.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose.bind(this));
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._openBtnEl.addEventListener("click", this.open.bind(this));
    this._popupEl.addEventListener("click", (evt) => {
      if (
        evt.target === this._popupCloseBtnEl ||
        evt.target === this._popupEl
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
