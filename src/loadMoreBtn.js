export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.btnRef = document.querySelector(selector);
  
    hidden && this.hide();
  }

  show() {
    this.btnRef.classList.remove('is-hidden');
  }

  hide() {
    this.btnRef.classList.add('is-hidden');
  }
  // enable() {
  //   this.btnRef.disabled = false;
  // }

  // disable() {
  //   this.btnRef.disabled = true;
  // }
}