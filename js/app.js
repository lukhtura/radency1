import createNoteTemplate from './createNoteTemplate';
import { showNoteForm, hideNoteForm } from './toggleNoteForm';
import addFormattedDate from './addFormattedDate';
import deleteNote from './deleteNote';
import editNote from './editNote';
import extractDates from './extractDates';
import refreshSummaries from './categoriesSummary';

import '../scss/styles.scss';

// table of notes ui parts
const notesList = document.querySelector('#list');
const createNoteBtn = document.querySelector('.create-button');

// table of summaries ui parts
const summaryList = document.querySelector('#summary-list');

//form ui parts
const modal = document.querySelector('#form-overlay');
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const contentInput = document.querySelector('#content');
const categorySelector = document.querySelector('#selector');
const submitBtn = document.querySelector('#submit-btn');
const closeBtn = document.querySelector('#close-modal-btn');

// data
let notesData = [
  {
    id: 1,
    date: 'July 31, 2023',
    title: 'Car Wash',
    category: 'Task',
    content: 'car wash before 8/18/2023',
    dates: ['8/18/2023'],
    isArchived: false,
  },
  {
    id: 2,
    date: 'August 1, 2023',
    title: 'Buy a Present',
    category: 'Task',
    content: 'for Nadia Birthday 9/1/2023',
    dates: ['9/1/2023'],
    isArchived: false,
  },
  {
    id: 3,
    date: 'August 1, 2023',
    title: 'Call Mom',
    category: 'Task',
    content: 'Do not forget!',
    dates: [],
    isArchived: false,
  },
  {
    id: 4,
    date: 'July 31, 2023',
    title: 'Car Wash',
    category: 'Idea',
    content: 'car wash before 8/18/2023',
    dates: ['8/18/2023'],
    isArchived: false,
  },
  {
    id: 5,
    date: 'August 1, 2023',
    title: 'Buy a Present',
    category: 'Task',
    content: 'for Nadia Birthday 9/1/2023',
    dates: ['9/1/2023'],
    isArchived: true,
  },
  {
    id: 6,
    date: 'August 1, 2023',
    title: 'Call Mom',
    category: 'Random Thought',
    content: 'Do not forget!',
    dates: [],
    isArchived: false,
  },
];

// notes id counter
let lastNoteId = notesData.reduce(
  (max, note) => (note.id > max ? note.id : max),
  0
);
let notesIdCounter = lastNoteId + 1;

function loadNotes(notesArr, listElement) {
  listElement.innerHTML = '';
  notesArr.forEach((note) => {
    if (note.isArchived === false) {
      listElement.insertAdjacentHTML('beforeend', createNoteTemplate(note));
    }
  });

  const noteEditBtns = document.querySelectorAll(
    '.list-item-buttons__edit-btn'
  );
  const noteArchiveBtns = document.querySelectorAll(
    '.list-item-buttons__archive-btn'
  );
  const noteDeleteBtns = document.querySelectorAll(
    '.list-item-buttons__delete-btn'
  );

  noteEditBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = +event.target.dataset.id;
      editNote(modal, form, id, notesData);
      refreshUI();
    });
  });

  noteArchiveBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = +event.target.dataset.id;
      notesArr.forEach((note) => {
        if (note.id === id) {
          note.isArchived = true;
        }
      });
      refreshUI();
    });
  });

  noteDeleteBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = +event.target.dataset.id;
      notesData = deleteNote(id, notesData);
      refreshUI();
    });
  });
}

function refreshUI() {
  loadNotes(notesData, notesList);
  refreshSummaries(notesData, summaryList);
}

// init
refreshUI();

function addNote(id) {
  if (nameInput.value && contentInput.value && categorySelector.value) {
    const noteName = nameInput.value;
    const noteContent = contentInput.value;
    const noteCategory = categorySelector.value;
    const date = new Date();

    // create note object
    const noteObj = {
      id: notesIdCounter++,
      date: addFormattedDate(date),
      title: noteName,
      category: noteCategory,
      content: noteContent,
      dates: extractDates(noteContent),
      isArchived: false,
    };

    // if id, change existing note, else create new
    if (id) {
      const currentNote = notesData.find((note) => note.id === id);
      currentNote.id = id;
      currentNote.title = noteName;
      currentNote.category = noteCategory;
      currentNote.content = noteContent;
      currentNote.dates = extractDates(noteContent);
    } else {
      notesData.push(noteObj);
    }

    // refresh ui after changes
    refreshUI();
  }
}

function submitForm(event, modal) {
  const id = +event.target.dataset.id;
  event.preventDefault();
  addNote(id);
  hideNoteForm(modal);
}

// OPEN FORM CREATE NOTE BUTTON LISTENER
createNoteBtn.addEventListener('click', () => {
  form.elements['submit-btn'].removeAttribute('data-id');
  form.reset();
  showNoteForm(modal);
});
// FORM CLOSE BUTTON LISTENER
closeBtn.addEventListener('click', () => hideNoteForm(modal));

// ADD NOTE BUTTON LISTENER
submitBtn.addEventListener('click', (event) => submitForm(event, modal));
