export function archivateNote(event, notesArr) {
  const id = +event.target.dataset.id;
  notesArr.forEach((note) => {
    if (note.id === id) {
      note.isArchived = !note.isArchived;
    }
  });
}

export function archivateAll(notesArr) {
  notesArr.forEach((note) => (note.isArchived = !note.isArchived));
}
