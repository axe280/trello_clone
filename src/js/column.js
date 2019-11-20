class Card {
  constructor(id = null, title = 'Title') {
    const instance = this;
    this.notes = [];

    const element = this.element = document.createElement('div');
    element.classList.add('column');
    element.setAttribute('draggable', 'true');

    if (id){
      element.setAttribute('data-column', id);
    } else {
      element.setAttribute('data-column', Card.idCounter);
      Card.idCounter++;
    }

    element.innerHTML = `<p class="column-header">${title}</p>
        <div data-notes></div>
        <p class="column-footer">
          <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`;

    const addNoteButton = element.querySelector('[data-action-addNote]');
    const cardHeader = element.querySelector('.column-header');

    this.headerEditable(cardHeader);

    // element
    //   .querySelectorAll('.note')
    //   .forEach(note => {
    //     // events for existing notes
    //     Note.process(note);
    //   });

    addNoteButton.addEventListener('click', function(event) {
      const note = new Note();
      instance.add(note);

      const dblClick = new Event('dblclick');
      note.element.dispatchEvent(dblClick);
    });

    element.addEventListener('dragstart', this.dragstart.bind(this));
    element.addEventListener('dragend', this.dragend.bind(this));
    element.addEventListener('dragenter', this.dragenter.bind(this));
    element.addEventListener('dragover', this.dragover.bind(this));
    element.addEventListener('dragleave', this.dragleave.bind(this));
    element.addEventListener('drop', this.drop.bind(this));
  }

  add(...notes) {
    for (const note of notes) {
      if (!this.notes.includes(note)) {
        this.notes.push(note);

        this.element.querySelector('[data-notes]').append(note.element);
      }
    }
  }

  headerEditable(cardHeader) {
    cardHeader.addEventListener('dblclick', () => {
      cardHeader.setAttribute('contenteditable', 'true');
      selectedInnerText(cardHeader);
      cardHeader.focus();
    });

    cardHeader.addEventListener('blur', () => {
      cardHeader.removeAttribute('contenteditable');

      Application.save();
    });
  }

  dragstart(event) {
    Card.dragged = this.element;
    this.element.classList.add('dragged');
  }

  dragend() {
    Card.dragged = null;
    this.element.classList.remove('dragged');

    document
      .querySelectorAll('.column')
      .forEach(card => {
        card.classList.remove('under');
      });

    Application.save();
  }

  dragenter() {
    if (!Card.dragged || this.element === Card.dragged) {
      return;
    }
  }

  dragover(event) {
    event.preventDefault();

    if (!Card.dragged || this.element === Card.dragged) {
      return;
    }

    this.element.classList.add('under');
  }

  dragleave() {
    if (!Card.dragged || this.element === Card.dragged) {
      return;
    }
    this.element.classList.remove('under');
  }

  drop(event) {
    if (Note.dragged) {
      this.element.querySelector('[data-notes]').append(Note.dragged);
    }

    if (Card.dragged) {
      const cards = Array.from(document.querySelectorAll('.column'));
      const indexA = cards.indexOf(this.element);
      const indexB = cards.indexOf(Card.dragged);

      if (indexA < indexB) {
        this.element.before(Card.dragged);
      } else {
        this.element.after(Card.dragged);
      }
    }
  }
}

Card.idCounter = 4;
Card.dragged = null;
