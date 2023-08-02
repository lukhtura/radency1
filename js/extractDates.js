function extractDates(contentString) {
  const regex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const dates = contentString.match(regex);

  return dates ? dates : '';
}

export default extractDates;
