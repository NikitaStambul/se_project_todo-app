import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  validationConfig,
  todoTemplateSelector,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";

const todoListSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
todoListSection.renderItems();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  openBtnSelector: ".button_action_add",
  handleFormSubmit: ({ name, date: dateInput }) => {
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { id: uuidv4(), name, date };
    renderTodo(values);

    addTodoPopup.close();
    newTodoFormValidator.resetValidation();
    onAddTodo();
  },
});
addTodoPopup.setEventListeners();

const newTodoFormValidator = new FormValidator(
  validationConfig,
  addTodoPopup.getForm()
);
newTodoFormValidator.enableValidation();

function renderTodo(data) {
  const todo = generateTodo(data);
  todoListSection.addItem(todo);
}

function generateTodo(data) {
  const todo = new Todo({
    data,
    templateSelector: todoTemplateSelector,
    onTodoCheck,
    onTodoDelete,
  });
  const todoEl = todo.getView();

  return todoEl;
}

// these functions are callbacks that supposed to be triggered on some events
// so calling onTodoCheck inside onTodoDelete to correspond DRY principle
// could lead to unintended side effects in case of adding functionality in the future
function onTodoCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function onTodoDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function onAddTodo() {
  todoCounter.updateTotal(true);
}
