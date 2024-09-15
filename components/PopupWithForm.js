import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, openBtnSelector, handleFormSubmit }) {
    super({ popupSelector, openBtnSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formEl = this._popupEl.querySelector(".popup__form");
    this._inputList = this._formEl.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((inputEl) => {
      values[inputEl.name] = inputEl.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
