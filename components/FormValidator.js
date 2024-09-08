class FormValidator {
  constructor(settings, formEl) {
    (this._inputSelector = settings.inputSelector),
      (this._submitButtonSelector = settings.submitButtonSelector),
      (this._errorClass = settings.errorClass),
      (this._inputErrorClass = settings.inputErrorClass),
      (this._inactiveButtonClass = settings.inactiveButtonClass),
      (this._formEl = formEl);
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonEl = this._formEl.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonEl);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(this._formEl, inputEl);
        this._toggleButtonState(inputList, buttonEl);
      });
    });
  };

  _toggleButtonState = (inputList, buttonEl) => {
    const hasInvalidInput = (() => {
      return inputList.some((inputEl) => {
        return !inputEl.validity.valid;
      });
    })();

    if (hasInvalidInput) {
      buttonEl.classList.add(this._inactiveButtonClass);
      buttonEl.disabled = true;
    } else {
      buttonEl.classList.remove(this._inactiveButtonClass);
      buttonEl.disabled = false;
    }
  };

  _checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(formEl, inputEl);
    }
  };

  _showInputError = (formEl, inputEl, errorMessage) => {
    const errorElId = `#${inputEl.id}-error`;
    const errorEl = formEl.querySelector(errorElId);
    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorClass);
  };

  _hideInputError = (formEl, inputEl) => {
    const errorElId = `#${inputEl.id}-error`;
    const errorEl = formEl.querySelector(errorElId);
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.classList.remove(this._errorClass);
    errorEl.textContent = "";
  };
}

export default FormValidator;
