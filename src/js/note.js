class Note {
  constructor (id = null, content = '') {
    const element = this.element = document.createElement('div');

    element.classList.add('note');
    element.setAttribute('draggable', 'true');
    element.textContent = content;

    if (id) {
      element.setAttribute('data-note-id', id);
    } else {
      element.setAttribute('data-note-id', Note.idCounter);
      Note.idCounter++;
    }

    element.addEventListener('dblclick', this.dblclick.bind(this));
    element.addEventListener('blur', this.blur.bind(this));

    element.addEventListener('dragstart', this.dragstart.bind(this));
    element.addEventListener('dragend', this.dragend.bind(this));
    element.addEventListener('dragenter', this.dragenter.bind(this));
    element.addEventListener('dragover', this.dragover.bind(this));
    element.addEventListener('dragleave', this.dragleave.bind(this));
    element.addEventListener('drop', this.drop.bind(this));
  }

  get card () {
    return this.element.closest('.column');
  }

  dblclick() {
    this.element.setAttribute('contenteditable', 'true');
    this.element.removeAttribute('draggable');
    this.card.removeAttribute('draggable');
    selectedInnerText(this.element);
    this.element.focus();
  }

  blur() {
    this.element.removeAttribute('contenteditable');
    this.element.setAttribute('draggable', 'true');
    this.card.setAttribute('draggable', 'true');

    if (!this.element.textContent.trim().length) {
      this.element.remove();
    }

    Application.save();
  }

  dragstart(event) {
    event.stopPropagation();

    Note.dragged = this.element;
    this.element.classList.add('dragged');
  }

  dragend(event) {
    event.stopPropagation();

    Note.dragged = null;
    this.element.classList.remove('dragged');

    document
      .querySelectorAll('.note')
      .forEach(note => {
        note.classList.remove('under');
      })

    Application.save();
  }

  dragenter() {
    if (!Note.dragged || this.element === Note.dragged) {
      return;
    }

    this.element.classList.add('under');
  }

  dragover(event) {
    event.preventDefault();

    if (!Note.dragged || this.element === Note.dragged) {
      return;
    }
  }

  dragleave() {
    if (!Note.dragged || this.element === Note.dragged) {
      return;
    }

    this.element.classList.remove('under');
  }

  drop(event) {
    if (!Note.dragged || this.element === Note.dragged) {
      return;
    }

    //the same card
    if (this.element.parentElement === Note.dragged.parentElement) {
      const notes = Array.from(this.element.parentElement.querySelectorAll('.note'));
      const indexA = notes.indexOf(this.element);
      const indexB = notes.indexOf(Note.dragged);

      if (indexA < indexB) {
        this.element.before(Note.dragged);
      } else {
        this.element.after(Note.dragged);
      }

    } 

    //another card
    else {
      this.element.before(Note.dragged);
      event.stopPropagation();
    }
  }
}

Note.idCounter = 1;
Note.dragged = null;
