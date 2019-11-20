'use strict';
// console.log(a);

Application.load();

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', () => {
    const card = new Card();
    document.querySelector('.columns').append(card.element);

    Application.save();
  });