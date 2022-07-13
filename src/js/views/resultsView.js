import view from './view.js';
import icons from 'url:../../img/icons.svg';
class resultsView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query, Please try again later!';
  _message = '';
  _generateMarkup() {
    return this._data
      .map(ele => {
        return this._generateMarkupPreview(ele);
      })
      .join('');
  }
  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const link = e.target.closest('.preview__link');
      if (!link) return;
      e.preventDefault();
      handler(link.getAttribute('href'));
    });
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
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
export default new resultsView();
