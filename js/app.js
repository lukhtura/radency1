import createTemplate from './noteTemplate';
import addFormattedDate from './addFormatedDate';
import deleteNote from './deleteNote';
import '../scss/styles.scss';

const notes = [];
const archivedNotes = [];
const date = new Date();

const notesList = document.querySelector('#list');
const createNoteBtn = document.querySelector('.create-button');

//form
const form = document.querySelector('#add-form');
const nameInput = document.querySelector('#name');
const contentInput = document.querySelector('#content');
const categorySelector = document.querySelector('#selector');
const submitBtn = document.querySelector('.note-form__add-btn');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNote() {
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

    notes.push(noteObj);
    form.reset();

    function edit() {
      form.elements['name'].value = noteObj.title;
      form.elements['content'].value = noteObj.content;
      form.elements['type'].value = noteObj.category;
    }

    editBtn.addEventListener('click', () => edit());
    deleteBtn.addEventListener('click', () => deleteNote(currentElement));
  }
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createNote();
  console.log(notes);
});
