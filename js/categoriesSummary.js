import getCategoryIcon from './getCategoryIcon';

function createSummaryTemplate(category, activeNum, archiveNum) {
  const iconSrc = getCategoryIcon(category);
  return `<li class="notes-list-item">
          <div class="title-container">
          <img src="${iconSrc}" class="title-container__icon" alt=${category} />
             <h3 class="title-container__title">${category}</h3>
          </div>
          <p class="list-item__created-date">${activeNum}</p>
          <p class="list-item__category">${archiveNum}</p>
      </li>`;
}

function renderSummary(listElement, obj) {
  listElement.insertAdjacentHTML(
    'beforeend',
    createSummaryTemplate(obj.name, obj.active, obj.archive)
  );
}

function createArrayOfSummaryObjects(notesArr) {
  const categoryStats = {};

  notesArr.forEach((item) => {
    if (!categoryStats[item.category]) {
      categoryStats[item.category] = {
        name: item.category,
        active: 0,
        archive: 0,
      };
    }

    if (item.isArchived) {
      categoryStats[item.category].archive++;
    } else {
      categoryStats[item.category].active++;
    }
  });

  // array of objects with statistic
  const summaryArr = Object.values(categoryStats);
  return summaryArr;
}

function refreshSummaries(notesArr, listElement) {
  listElement.innerHTML = '';
  const summaryData = createArrayOfSummaryObjects(notesArr);
  summaryData.forEach((summaryObj) => {
    renderSummary(listElement, summaryObj);
  });
}

export default refreshSummaries;
