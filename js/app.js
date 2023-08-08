// import functions
import createNoteTemplate from './createNoteTemplate';
import { showModal, hideModal } from './modalControl';
import addFormattedDate from './addFormattedDate';
import deleteNote from './deleteNote';
import editNote from './editNote';
import { archivateNote } from './archivateNote';
import extractDates from './extractDates';
import refreshSummaries from './categoriesSummary';
import changeTableTypeSwitcherText from './changeTableTypeSwitcherText';
import validateForm from './validateForm';

// import styles
import '../scss/styles.scss';

// table of notes ui parts
const notesList = document.querySelector('#list');
const createNoteBtn = document.querySelector('.create-button');
const tableTypeBtn = document.querySelector('.table-type-button');
const deleteAllBtn = document.querySelector('#delete-all-button');
const archiveAllBtn = document.querySelector('#archive-all-button');

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
const validateMsg = document.querySelector('.note-form__validate-msg');

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
    category: 'Idea',
    content: 'Do not forget!',
    dates: [],
    isArchived: false,
  },
];

// find last note id
const lastNoteId = notesData.reduce(
  (max, note) => (note.id > max ? note.id : max),
  0
);

//notes id counter state
let notesIdCounter = lastNoteId + 1;

// table type state
let isArchiveTableShow = false;

// notes init function
function loadNotes(notesArr, listElement) {
  // clean list from old notes
  listElement.innerHTML = '';

  // render notes
  try {
    notesArr.forEach((note) => {
      if (note.isArchived === isArchiveTableShow) {
        listElement.insertAdjacentHTML(
          'beforeend',
          createNoteTemplate(note, isArchiveTableShow)
        );
      }
    });
  } catch (error) {
    // if error show message
    listElement.insertAdjacentHTML(
      'beforeend',
      '<h2 class="error">SOMETHING WENT WRONG</h2>'
    );
  }

  // define notes buttons
  const noteEditBtns = document.querySelectorAll(
    '.list-item-buttons__edit-btn'
  );
  const noteArchiveBtns = document.querySelectorAll(
    '.list-item-buttons__archive-btn'
  );
  const noteDeleteBtns = document.querySelectorAll(
    '.list-item-buttons__delete-btn'
  );

  function handleDeleteButton(event) {
    const id = +event.target.dataset.id;
    const updatedNotes = deleteNote(id, notesData);
    notesData = updatedNotes;
    refreshUI();
  }

  // add event listeners
  noteEditBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      showModal(modal);
      editNote(event, form, notesData);
      refreshUI();
    });
  });

  noteArchiveBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      archivateNote(event, notesArr);
      refreshUI();
    });
  });

  noteDeleteBtns.forEach((btn) => {
    btn.addEventListener('click', handleDeleteButton);
  });
}

// refresh notes table and summaries table
function refreshUI() {
  loadNotes(notesData, notesList);
  refreshSummaries(notesData, summaryList);
}

// add note function
function addNote(id) {
  if (nameInput.value && contentInput.value) {
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

// init
refreshUI();

// button handlers
function submitForm(event, modal) {
  const id = +event.target.dataset.id;
  event.preventDefault();
  // validation
  if (validateForm(nameInput, contentInput)) {
    addNote(id);
    hideModal(modal, form, validateMsg);
  } else {
    validateMsg.innerHTML = 'min. 3 chars each field';
  }
}

function handleCreateNoteBtn() {
  showModal(modal);
}

function handleTableTypeBtn() {
  isArchiveTableShow = !isArchiveTableShow;
  changeTableTypeSwitcherText(isArchiveTableShow, tableTypeBtn);
  refreshUI();
}
// button handlers end

// createnote button listener
createNoteBtn.addEventListener('click', handleCreateNoteBtn);

// close form button listener
closeBtn.addEventListener('click', () => hideModal(modal, form, validateMsg));

// add note button listener
submitBtn.addEventListener('click', (event) => submitForm(event, modal));

// change table type button listener
tableTypeBtn.addEventListener('click', handleTableTypeBtn);

//delete all button listener
deleteAllBtn.addEventListener('click', () => {
  notesData.length = 0;
  refreshUI();
});

// head archive all button listener
archiveAllBtn.addEventListener('click', () => {
  notesData.forEach((note) => (note.isArchived = true));
  refreshUI();
});
