import trashIcon from '../images/trash-icon.svg';
import archiveIcon from '../images/archive-icon.svg';
import pencilIcon from '../images/pencil-icon.svg';

function createNoteTemplate(noteObj) {
  const { id, date, title, category, content, dates } = noteObj;

  return `<li data-id="${id}" class="notes-list__item">
    <h3 class="list-item__name">${title}</h3>
    <p class="list-item__created-date">${date}</p>
    <p class="list-item__category">${category}</p>
    <p class="list-item__content">${content}</p>
    <p class="list-item__dates">${dates}</p>
    <div class="list-item-buttons">
      <img
        data-id="${id}"
        class="list-item-buttons__btn list-item-buttons__edit-btn btn"
        src="${pencilIcon}"
        alt="edit"
      />
      <img
        data-id="${id}"
        class="list-item-buttons__btn list-item-buttons__archive-btn btn"
        src="${archiveIcon}"
        alt="archive"
      />
      <img
        data-id="${id}"
        class="list-item-buttons__btn list-item-buttons__delete-btn btn"
        src="${trashIcon}"
        alt="delete"
      />
    </div>
    </li>`;
}

export default createNoteTemplate;
