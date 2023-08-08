// form validation

function validateForm(...inputs) {
  const isValide = inputs.every((input) => input.value.length >= 3);
  return isValide;
}

export default validateForm;
