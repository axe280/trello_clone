'use strict';
// console.log(a);

Application.load();

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', () => {
    const card = Card.create();
    document.querySelector('.columns').append(card);

    Application.save();
  });