const Application = {

  save() {
    const objectData = {
      columns: {
        idCounter: Card.idCounter,
        items: []
      },

      notes: {
        idCounter: Note.idCounter,
        items: []
      }
    };


    document
      .querySelectorAll('.column')
      .forEach(columnElement => {
        const column = {
          title: columnElement.querySelector('.column-header').textContent,
          id: parseInt(columnElement.getAttribute('data-column')),
          noteIds: []
        }

        columnElement
          .querySelectorAll('.note')
          .forEach(noteElement => {
            column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')));
          });

        objectData.columns.items.push(column);
      });


    document
      .querySelectorAll('.note')
      .forEach(noteElement => {
        const note = {
          id: parseInt(noteElement.getAttribute('data-note-id')),
          content: noteElement.textContent
        }

        objectData.notes.items.push(note);
      });


    const json = JSON.stringify(objectData);

    localStorage.setItem('cards', json);
  },


  load() {
    if (!localStorage.getItem('cards')) {
      return;
    }

    const cardsWrapper = document.querySelector('.columns');
    cardsWrapper.innerHTML = '';

    const objectData = JSON.parse(localStorage.getItem('cards'));
    const getNoteById = id => objectData.notes.items.find(note => note.id === id);

    for (const column of objectData.columns.items) {
      const columnElement = Card.create(column);

      cardsWrapper.append(columnElement);

      for (const noteId of column.noteIds) {
        const note = getNoteById(noteId);

        const noteElement = Note.create(note.id, note.content);
        columnElement.querySelector('[data-notes]').append(noteElement);
      }
    }
  }

};