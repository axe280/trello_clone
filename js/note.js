const Note = {
  idCounter: 9,
  dragged: null,

  process(note) {
    note.addEventListener('dblclick', Note.dblclick);
    note.addEventListener('blur', Note.blur);

    note.addEventListener('dragstart', Note.dragstart);
    note.addEventListener('dragend', Note.dragend);
    note.addEventListener('dragenter', Note.dragenter);
    note.addEventListener('dragover', Note.dragover);
    note.addEventListener('dragleave', Note.dragleave);
    note.addEventListener('drop', Note.drop);
  },

  dblclick() {
    this.setAttribute('contenteditable', 'true');
    this.removeAttribute('draggable');
    this.closest('.column').removeAttribute('draggable');
    selectedInnerText(this);
    this.focus();
  },

  blur() {
    this.removeAttribute('contenteditable');
    this.setAttribute('draggable', 'true');
    this.closest('.column').setAttribute('draggable', 'true');

    if (!this.textContent.trim().length) {
      this.remove();
    }
  },

  create() {
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

    // events for new note
    Note.process(createdNote);

    return createdNote;
  },

  dragstart(event) {
    event.stopPropagation();

    Note.dragged = this;
    this.classList.add('dragged');
  },

  dragend(event) {
    event.stopPropagation();

    Note.dragged = null;
    this.classList.remove('dragged');

    document
      .querySelectorAll('.note')
      .forEach(note => {
        note.classList.remove('under');
      })
  },

  dragenter() {
    if (!Note.dragged || this === Note.dragged) {
      return;
    }

    this.classList.add('under');
  },

  dragover(event) {
    event.preventDefault();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }
  },

  dragleave() {
    if (!Note.dragged || this === Note.dragged) {
      return;
    }

    this.classList.remove('under');
  },

  drop(event) {
    if (!Note.dragged || this === Note.dragged) {
      return;
    }

    //the same card
    if (this.parentElement === Note.dragged.parentElement) {
      const notes = Array.from(this.parentElement.querySelectorAll('.note'));
      const indexA = notes.indexOf(this);
      const indexB = notes.indexOf(Note.dragged);

      if (indexA < indexB) {
        this.before(Note.dragged);
      } else {
        this.after(Note.dragged);
      }

    } 

    //another card
    else {
      this.before(Note.dragged);
      event.stopPropagation();
    }
  }
};