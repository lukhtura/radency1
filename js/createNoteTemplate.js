import getCategoryIcon from './getCategoryIcon';

import trashIcon from '../images/trash-icon.svg';
import archiveIcon from '../images/archive-icon.svg';
import pencilIcon from '../images/pencil-icon.svg';

// create HTML template note list item
function createNoteTemplate(noteObj, archiveTableStatus) {
  const { id, date, title, category, content, dates } = noteObj;

  const iconSrc = getCategoryIcon(category);

  return `<li data-id="${id}" class="notes-list-item">
    <div class="title-container">
      <img src="${iconSrc}" class="title-container__icon" alt=${category} />
      <h3 class="title-container__title">${title}</h3>
    </div>
    <p class="notes-list-item__created-date">${date}</p>
    <p class="notes-list-item__category">${category}</p>
    <p class="notes-list-item__content">${content}</p>
    <p class="notes-list-item__dates">${dates}</p>
    <div class="list-item-buttons">
      <img
        data-id="${id}"
        class="list-item-buttons__btn list-item-buttons__edit-btn btn"
        src="${pencilIcon}"
        alt="edit"
        title="Edit note"
      />
      <img
        data-id="${id}"
        class="list-item-buttons__btn list-item-buttons__archive-btn btn  ${
          archiveTableStatus ? 'rotated' : ''
        }"
        src="${archiveIcon}"
        alt="archive"
        title="Archivate note"
      />
      <img
        data-id="${id}"
        class="list-item-buttons__btn list-item-buttons__delete-btn btn"
        src="${trashIcon}"
        alt="delete"
        title="Delete note"
      />
    </div>
    </li>`;
}

export default createNoteTemplate;
