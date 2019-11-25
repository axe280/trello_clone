class Bin {
  constructor() {
    const element = this.element = document.createElement('div');
    element.classList.add('bin');
    document.querySelector('.container').append(element);

    element.addEventListener('dragover', this.dragover.bind(this));
    element.addEventListener('dragenter', this.dragenter.bind(this));
    element.addEventListener('dragleave', this.dragleave.bind(this));
    element.addEventListener('drop', this.drop.bind(this));
  }

  dragover(event) {
    event.preventDefault();
  }

  dragenter(event) {
    this.element.classList.add('bin_hover');
  }

  dragleave(event) {
    this.element.classList.remove('bin_hover');
  }

  drop(event) {

    if (Card.dragged) {
      Card.dragged.remove();
      Card.dragged = null;
    }

    if (Note.dragged) {
      Note.dragged.remove();
      Note.dragged = null;
    }

    this.element.classList.remove('bin_hover');

    Application.save();
  }
}