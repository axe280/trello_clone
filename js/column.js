const Card = {
  idCounter: 4,
  dragged: null,

  process(card) {
    const addNoteButton = card.querySelector('[data-action-addNote]');
    const cardHeader = card.querySelector('.column-header');

    Card.headerEditable(cardHeader);

    card
      .querySelectorAll('.note')
      .forEach(note => {
        // events for existing notes
        Note.process(note);
      });

    addNoteButton.addEventListener('click', () => {
      Card.createNote(card);
    });

    card.addEventListener('dragstart', Card.dragstart);
    card.addEventListener('dragend', Card.dragend);
    card.addEventListener('dragenter', Card.dragenter);
    card.addEventListener('dragover', Card.dragover);
    card.addEventListener('dragleave', Card.dragleave);
    card.addEventListener('drop', Card.drop);
  },

  createNote(card) {
    const createdNote = createOptElement({
      elementTag: 'div',
      classNamesSting: 'note',
      attributeNames: [
        {
          name: 'draggable',
          value: 'true'
        },
        {
          name: 'data-note-id',
          value: Note.idCounter
        }
      ]
    });

    Note.idCounter++;

    card.querySelector('[data-notes]').append(createdNote);

    // events for new note
    Note.process(createdNote);

    let dblClick = new Event('dblclick');
    createdNote.dispatchEvent(dblClick);
  },

  headerEditable(cardHeader) {
    cardHeader.addEventListener('dblclick', () => {
      cardHeader.setAttribute('contenteditable', 'true');
      selectedInnerText(cardHeader);
      cardHeader.focus();
    });

    cardHeader.addEventListener('blur', () => {
      cardHeader.removeAttribute('contenteditable');
    });
  },

  dragstart() {
    if (Note.dragged) {
      return;
    }

    Card.dragged = this;
    this.classList.add('dragged');
  },

  dragend() {
    Card.dragged = null;
    this.classList.remove('dragged');

    document
      .querySelectorAll('.column')
      .forEach(card => {
        card.classList.remove('under');
      })
  },

  dragenter() {
    if (Note.dragged) {
      return;
    }

    if (this === Card.dragged) {
      return;
    }
  },

  dragover() {
    event.preventDefault();

    if (Note.dragged) {
      return;
    }

    if (this === Card.dragged) {
      return;
    }

    this.classList.add('under');
  },

  dragleave() {
    if (this === Card.dragged) {
      return;
    }
    this.classList.remove('under');
  },

  drop(event) {
    event.stopPropagation();

    if (Note.dragged) {
      this.querySelector('[data-notes]').append(Note.dragged);
      return;
    }

    if (this === Card.dragged) {
      return;
    }

    const cards = Array.from(document.querySelectorAll('.column'));
    const indexA = cards.indexOf(this);
    const indexB = cards.indexOf(Card.dragged);

    if (indexA < indexB) {
      this.before(Card.dragged);
    } else {
      this.after(Card.dragged);
    }
  }
};