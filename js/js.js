'use strict';
// console.log(a);

document
  .querySelectorAll('.column')
  .forEach(Card.process);


// create card
document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', () => {
    const createdCard = createOptElement({
      elementTag: 'div',
      classNamesSting: 'column',
      elementInner: `<p class="column-header">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
          <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`,
      attributeNames: [
        {
          name: 'draggable',
          value: 'true'
        },
        {
          name: 'data-column',
          value: Card.idCounter
        }
      ]
    });

    Card.idCounter++;

    document.querySelector('.columns').append(createdCard);

    Card.process(createdCard);
  });

