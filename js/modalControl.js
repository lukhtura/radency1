import normalizeForm from './normalizeForm';

export function showModal(modalElement) {
  modalElement.classList.remove('hide');
}

export function hideModal(modalElement, form, validateMsg) {
  modalElement.classList.add('hide');
  normalizeForm(form, validateMsg);
}
