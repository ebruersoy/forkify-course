import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage, false);
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage, true);
    }
    // other pages
    if (currentPage < numPages) {
      return `
      ${this._generateMarkupButton(currentPage, true)}
      ${this._generateMarkupButton(currentPage, false)}`;
    }
    // page 1 no other
    return '';
  }
  _generateMarkupButton(currentPage, prev) {
    const pageGoto = prev ? currentPage - 1 : currentPage + 1;
    return `
          <button data-goto="${pageGoto}" class="btn--inline pagination__btn--${
      prev ? 'prev' : 'next'
    }">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-${
      prev ? 'left' : 'right'
    }"></use>
              </svg>
              <span>Page ${pageGoto}</span>
          </button>
          `;
  }
}

export default new PaginationView();
