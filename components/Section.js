class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._containerEl = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      renderer(item);
    });
  }

  addItem(item) {
    this._containerEl.append(item);
  }
}

export default Section;
