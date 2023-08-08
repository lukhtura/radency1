function editNote(event, form, notesArr) {
  const id = +event.target.dataset.id;
  // find note
  const noteObj = notesArr.find((note) => note.id === id);
  // extract note data to the form
  form.elements['name'].value = noteObj.title;
  form.elements['content'].value = noteObj.content;
  form.elements['type'].value = noteObj.category;
  form.elements['submit-btn'].setAttribute('data-id', id);
  form.elements['submit-btn'].value = 'Change';
}

export default editNote;
