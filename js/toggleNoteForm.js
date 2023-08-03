import normalizeForm from './normalizeForm';

export function showNoteForm(modal) {
  modal.classList.remove('hide');

  const keydownHandler = (event) => {
    if (event.key === 'Escape') {
      hideNoteForm(modal);
    }
  };
  document.addEventListener('keydown', keydownHandler);
}

export function hideNoteForm(modal, form, validateMsg) {
  modal.classList.add('hide');
  normalizeForm(form, validateMsg);
}
