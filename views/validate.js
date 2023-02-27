const form = document.querySelector('#create-page-form');
const titleField = document.querySelector('#title');
const titleError = document.querySelector('#title-error');
const metaDescriptionField = document.querySelector('#meta_description');
const metaDescriptionError = document.querySelector('#meta-description-error');
const contentField = document.querySelector('#content');
const contentError = document.querySelector('#content-error');
const slugField = document.querySelector('#slug');
const slugError = document.querySelector('#slug-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let hasError = false;

  // Validate title field
  if (titleField.value.trim() === '') {
    titleError.textContent = 'Please enter a title';
    titleField.classList.add('is-invalid');
    hasError = true;
  } else if (titleField.value.trim().length < 5) {
    titleError.textContent = 'Title must be at least 5 characters long';
    titleField.classList.add('is-invalid');
    hasError = true;
  } else {
    titleError.textContent = '';
    titleField.classList.remove('is-invalid');
  }

  // Validate meta description field
  if (metaDescriptionField.value.trim() === '') {
    metaDescriptionError.textContent = 'Please enter a meta description';
    metaDescriptionField.classList.add('is-invalid');
    hasError = true;
  } else if (metaDescriptionField.value.trim().length < 10) {
    metaDescriptionError.textContent = 'Meta description must be at least 10 characters long';
    metaDescriptionField.classList.add('is-invalid');
    hasError = true;
  } else {
    metaDescriptionError.textContent = '';
    metaDescriptionField.classList.remove('is-invalid');
  }

  // Validate content field
  if (contentField.value.trim() === '') {
    contentError.textContent = 'Please enter content';
    contentField.classList.add('is-invalid');
    hasError = true;
  } else if (contentField.value.trim().length < 50) {
    contentError.textContent = 'Content must be at least 50 characters long';
    contentField.classList.add('is-invalid');
    hasError = true;
  } else {
    contentError.textContent = '';
    contentField.classList.remove('is-invalid');
  }

  // Validate slug field
  if (slugField.value.trim() === '') {
    slugError.textContent = 'Please enter a slug';
    slugField.classList.add('is-invalid');
    hasError = true;
  } else if (!slugField.value.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
    slugError.textContent = 'Slug must be in lowercase alphanumeric characters separated by hyphens';
    slugField.classList.add('is-invalid');
    hasError = true;
  } else {
    slugError.textContent = '';
    slugField.classList.remove('is-invalid');
  }

  // If no error, submit the form
  if (!hasError) {
    form.submit();
  }
});
































const regForm = document.getElementById('regForm');
console.log(regForm)
const fullNameInput = regForm.querySelector('input[name="fullname"]');
const emailInput = regForm.querySelector('input[name="email"]');
const passwordInput = regForm.querySelector('input[name="password"]');
const cpasswordInput = regForm.querySelector('input[name="cpassword"]');

regForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fullNameValue = fullNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const cpasswordValue = cpasswordInput.value.trim();

  if (fullNameValue === '') {
    // display error message for Fullname field
    return;
  }

  if (emailValue === '' || !isValidEmail(emailValue)) {
    // display error message for Email field
    return;
  }

  if (passwordValue === '' || passwordValue.length < 6) {
    // display error message for Password field
    return;
  }

  if (cpasswordValue === '' || cpasswordValue !== passwordValue) {
    // display error message for Confirm Password field
    return;
  }

  // Submit regForm if all fields are valid
  regForm.submit();
});

function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}