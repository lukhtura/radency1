function createTemplate(noteObj, date) {
  const { id, title, category, content } = noteObj;

  return `<li data-id="${id}" class="notes-list__item">
  <h3 class="list-item__name">${title}</h3>
  <p class="list-item__created-date">${date}</p>
  <p class="list-item__category">${category}</p>
  <p class="list-item__content">${content}</p>
  <p class="list-item__dates">dates</p>
  <div class="list-item-buttons">
    <img
      class="list-item-buttons__btn edit-btn"
      src="./images/pencil-icon.svg"
      alt="edit"
    />
    <img
      class="list-item-buttons__btn archive-btn"
      src="./images/archive-icon.svg"
      alt="archive"
    />
    <img
      class="list-item-buttons__btn delete-btn"
      src="./images/trash-icon.svg"
      alt="delete"
    />
  </div>`;
}

export default createTemplate;
