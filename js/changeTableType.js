function changeTableType(archiveTableStatus, button) {
  if (archiveTableStatus) {
    button.innerHTML = 'Show main table';
  } else {
    button.innerHTML = 'Show archive table';
  }
}

export default changeTableType;
