// reset form, delete validation message,
function normalizeForm(form, msg) {
  if (form.elements['submit-btn'].value === 'Change') {
    form.elements['submit-btn'].value = 'Add note';
    form.elements['submit-btn'].removeAttribute('data-id');
  }
  // delete validation msg
  msg.innerHTML = '';
  form.reset();
}

export default normalizeForm;
