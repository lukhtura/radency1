export function showNoteForm(modal) {
  modal.classList.remove('hide');

  const keydownHandler = (event) => {
    if (event.key === 'Escape') {
      hideNoteForm(modal);
    }
  };
  document.addEventListener('keydown', keydownHandler);

  return true;
}

export function hideNoteForm(modal) {
  modal.classList.add('hide');
  return false;
}
