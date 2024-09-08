import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const todoSelectors = {
  todoSelector: ".todo",
  todoNameSelector: ".todo__name",
  todoCheckboxSelector: ".todo__completed",
  todoLabelSelector: ".todo__label",
  todoDateSelector: ".todo__date",
  todoDeleteBtnSelector: ".todo__delete-btn",
};

class Todo {
  constructor(data, templateSelector) {
    const { id, name, completed, date } = data;
    this._id = id ?? uuidv4();
    this._name = name || "Unnamed todo";
    this._completed = completed || false;
    this._date = date ?? new Date();
    this._templateEl = document.querySelector(templateSelector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoEl.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoEl.querySelector(
      todoSelectors.todoCheckboxSelector
    );
    this._todoLabel = this._todoEl.querySelector(
      todoSelectors.todoLabelSelector
    );
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  getView() {
    this._todoEl = this._templateEl.content
      .querySelector(todoSelectors.todoSelector)
      .cloneNode(true);

    this._todoNameEl = this._todoEl.querySelector(
      todoSelectors.todoNameSelector
    );
    this._todoDate = this._todoEl.querySelector(todoSelectors.todoDateSelector);
    this._todoDeleteBtn = this._todoEl.querySelector(
      todoSelectors.todoDeleteBtnSelector
    );

    this._todoNameEl.textContent = this._name;

    this._generateCheckboxEl();
    this._setEventListeners();

    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    return this._todoEl;
  }
}

export default Todo;
