import view from './view.js';
import icons from 'url:../../img/icons.svg';
import { RESULTPERPAGE } from '../config.js';
class addrecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnopen = document.querySelector('.nav__btn--add-recipe');
  _btnclose = document.querySelector('.btn--close-modal');
  _message = 'Recipe succesfully uploaded ):';
  constructor() {
    super();
    this._addhandlerShowWindow();
    this._addhandlerclosewindow();
  }
  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addhandlerShowWindow() {
    this._btnopen.addEventListener('click', this._toggleWindow.bind(this));
  }
  _addhandlerclosewindow() {
    this._btnclose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }

  _addhandlerupload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new addrecipeView();
