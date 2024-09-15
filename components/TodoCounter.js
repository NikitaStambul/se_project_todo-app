class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.reduce((acc, todo) =>
      acc + todo.completed ? 1 : 0
    );
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (isIncrement) => {
    this._completed += isIncrement ? 1 : -1;
    this._updateText();
  };

  updateTotal = (isIncrement) => {
    this._total += isIncrement ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
