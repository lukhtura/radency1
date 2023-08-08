import taskIcon from '../images/task-icon.svg';
import ideaIcon from '../images/idea-icon.svg';
import randomIcon from '../images/random-icon.svg';

// return needed icon from category
function getCategoryIcon(category) {
  const lowerCaseCategory = category.toLocaleLowerCase();
  const firstCategoryWord = lowerCaseCategory.split(' ')[0];

  switch (firstCategoryWord) {
    case 'task':
      return taskIcon;
    case 'idea':
      return ideaIcon;
    case 'random':
      return randomIcon;
  }
}

export default getCategoryIcon;
