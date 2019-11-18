// move caret cursor to end
function selectedInnerText(element) {
  if (element.textContent.length > 0) {
    const range = new Range();
    range.setStart(element.firstChild, 0);
    range.setEnd(element.firstChild, element.textContent.length);

    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  }
}