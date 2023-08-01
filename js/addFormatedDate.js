function addFormattedDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default addFormattedDate;

// Пример использования:
const myDate = new Date();
const formattedDate = addFormattedDate(myDate);
console.log(formattedDate);
