export default class LoadMoreBtn {
  constructor(selector) {
    this.btnRef = document.querySelector(selector);
  }
  enable() {
    this.btnRef.disabled = false;
  }

  disable() {
    this.btnRef.disabled = true;
  }
}