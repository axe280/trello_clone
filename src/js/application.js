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
      .forEach(cardElement => {
        const card = {
          title: cardElement.querySelector('.column-header').textContent,
          id: parseInt(cardElement.getAttribute('data-column')),
          noteIds: []
        }

        cardElement
          .querySelectorAll('.note')
          .forEach(noteElement => {
            card.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')));
          });

        objectData.columns.items.push(card);
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

    for (const { id, noteIds, title } of objectData.columns.items) {
      const card = new Card(id, title);

      cardsWrapper.append(card.element);

      for (const noteId of noteIds) {
        const { id, content } = getNoteById(noteId);
        const note = new Note(id, content);
        card.add(note);
      }
    }

    Card.idCounter = objectData.columns.idCounter;
    Note.idCounter = objectData.notes.idCounter;
  }

};