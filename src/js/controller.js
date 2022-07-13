import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import searchview from './views/searchview.js';
import icons from '../img/icons.svg';
import addrecipeView from './views/addrecipeView.js';
import bookmarksView from './views/bookmarksView.js';
import { MAGIC_NUMBER } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';
import { async } from 'regenerator-runtime/runtime';
console.log(icons);
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
  //prevent from reloading the page when save
  console.log('not refresh');
}

const controlRecipe = async function () {
  try {
    //1.loading recipe

    const id = window.location.hash.slice();
    console.log(id);
    if (!id) return;
    recipeContainer.innerHTML = '';
    recipeView.renderSpinner();
    recipeView._update(model.state.recipe);

    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    //2.rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    // resultsView.renderSpinner();
    const query = searchview.getQuery();
    resultsView.renderSpinner();
    console.log(query);
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
    recipeContainer.innerHTML = '';
    await model.loadRecipe(model.state.search.results[0].id);
    recipeView.render(model.state.recipe);
  } catch (err) {}
};

const controlPaginationResult = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // console.log(model.getSearchResultsPage(1));
  paginationView.render(model.state.search);
  // resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  // paginationView.render(model.state.search);
};
const controlServings = function (add) {
  //upade the recipe servings
  //underlining data we ned to
  const newServings = model.state.recipe.servings + add;
  if (newServings >= 1) {
    model.updateServings(newServings);
    recipeView._update(model.state.recipe);
  }
};
const controlResultClick = async function (id) {
  try {
    //1.loading recipe
    if (!id) return;
    recipeContainer.innerHTML = '';
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    //2.rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlAddBookmarks = function () {
  if (model.state.recipe.bookmarked === false) {
    model.addBookmark(model.state.recipe);
    console.log(model.state.recipe);
    recipeView._update(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe);
    recipeView._update(model.state.recipe);
  }
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarksView = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addrecipeView.renderMessage();
    setTimeout(() => {
      addrecipeView._toggleWindow();
    }, MAGIC_NUMBER * 1000);
  } catch (err) {
    console.log(err.message);
    addrecipeView.renderError(err.message);
  }
};
const init = function () {
  recipeView._addHandlerUpdateServings(controlServings);
  recipeView.addHandlerRender(controlRecipe);
  recipeView._addHandlerBookmark(controlAddBookmarks);
  searchview.addhandlerSearch(controlSearchResults);
  resultsView._addHandlerClick(controlResultClick);
  bookmarksView._addHandlerClick(controlResultClick);
  bookmarksView._addhandlerControl(controlBookmarksView);
  paginationView._addHandlerClick(controlPaginationResult);
  addrecipeView._addhandlerupload(controlAddRecipe);
};
init();
