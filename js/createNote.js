function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNote(nameInput, contentInput, categorySelector, notesList) {
  if (nameInput.value && contentInput.value && categorySelector.value) {
    const taskName = nameInput.value;
    const taskContent = contentInput.value;
    const taskCategory = categorySelector.value;

    const noteObj = {
      id: getRandomNumber(1, 100000),
      title: taskName,
      category: taskCategory,
      content: taskContent,
    };

    notesList.insertAdjacentHTML(
      'beforeend',
      createTemplate(noteObj, addFormattedDate(date))
    );

    const currentElement = document.querySelector(`[data-id="${noteObj.id}"]`),
      editBtn = currentElement.querySelector('.edit-btn'),
      deleteBtn = currentElement.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => deleteNote(currentElement));

    notes.push(noteObj);
  }
}

export default createNote;
