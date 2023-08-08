import getCategoryIcon from './getCategoryIcon';

// create HTML template for summary table item
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
  // create object of summaries
  const categoryStats = {};

  // iterate notes arr
  notesArr.forEach((item) => {
    // if category doesnt exist in categoryStats object, then add it
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

// refresh ui of summaries
function refreshSummaries(notesArr, listElement) {
  // clean old summaries
  listElement.innerHTML = '';
  // create and array of summary
  const summaryData = createArrayOfSummaryObjects(notesArr);
  // render it to the page
  summaryData.forEach((summaryObj) => {
    renderSummary(listElement, summaryObj);
  });
}

export default refreshSummaries;
