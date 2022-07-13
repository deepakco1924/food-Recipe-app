import view from './view.js';
import icons from 'url:../../img/icons.svg';
class bookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet , find a good recipe and bookmark it:';
  _message = '';
  _generateMarkup() {
    return this._data
      .map(ele => {
        return this._generateMarkupPreview(ele);
      })
      .join('');
  }
  _addhandlerControl(handler) {
    window.addEventListener('load', function (e) {
      handler();
    });
  }
  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const link = e.target.closest('.preview__link');
      e.preventDefault();
      if (!link) return;
      handler(link.getAttribute('href'));
    });
  }
  _generateMarkupPreview(result) {
    const markup = `<li class="preview">
            <a class="preview__link " href="${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
              </div>
            </a>
          </li>`;
    return markup;
  }
}
export default new bookmarkView();
