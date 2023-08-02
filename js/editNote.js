import { showNoteForm } from './toggleNoteForm';

function editNote(modal, form, id, notesArr) {
  showNoteForm(modal);
  const noteObj = notesArr.find((note) => note.id === id);
  form.elements['name'].value = noteObj.title;
  form.elements['content'].value = noteObj.content;
  form.elements['type'].value = noteObj.category;
  form.elements['submit-btn'].setAttribute('data-id', id);
}

export default editNote;
