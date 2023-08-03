function deleteNote(id, notesArr) {
  const updatedNotes = notesArr.filter((note) => note.id !== id);
  return updatedNotes;
}

export default deleteNote;
