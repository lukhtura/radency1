function createSummaryTemplate(name, activeNum, archiveNum) {
  return `<li class="notes-list__item">
          <h3 class="list-item__name">${name}</h3>
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

function createSummaryObjects(notesArr) {
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
  const summaryData = createSummaryObjects(notesArr);
  summaryData.forEach((summaryObj) => {
    renderSummary(listElement, summaryObj);
  });
}

export default refreshSummaries;
