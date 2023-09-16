
// Validation for create-page-form
const form = document.querySelector('#create-page-form');

const fields = [
  {
    input: document.querySelector('#title'),
    error: document.querySelector('#title-error'),
    minLen: 5,
    errorMsg: 'Title must be at least 5 characters long',
  },
  {
    input: document.querySelector('#meta_description'),
    error: document.querySelector('#meta-description-error'),
    minLen: 10,
    errorMsg: 'Meta description must be at least 10 characters long',
  },
  {
    input: document.querySelector('#content'),
    error: document.querySelector('#content-error'),
    minLen: 50,
    errorMsg: 'Content must be at least 50 characters long',
  },
  {
    input: document.querySelector('#slug'),
    error: document.querySelector('#slug-error'),
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    errorMsg: 'Slug must be in lowercase alphanumeric characters separated by hyphens',
  },
];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let hasError = false;

  fields.forEach((field) => {
    const { input, error, minLen, pattern, errorMsg } = field;
    const value = input.value.trim();

    if (value === '' || (minLen && value.length < minLen) || (pattern && !pattern.test(value))) {
      error.textContent = value === '' ? 'Please enter a value' : errorMsg;
      input.classList.add('is-invalid');
      hasError = true;
    } else {
      error.textContent = '';
      input.classList.remove('is-invalid');
    }
  });

  if (!hasError) {
    form.submit();
  }
});

// Validation for regForm
const regForm = document.getElementById('regForm');
const fullNameInput = regForm.querySelector('input[name="fullname"]');
const emailInput = regForm.querySelector('input[name="email"]');
const passwordInput = regForm.querySelector('input[name="password"]');
const cpasswordInput = regForm.querySelector('input[name="cpassword"]');

regForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = [
    { input: fullNameInput, errorMsg: 'Please enter your full name' },
    { input: emailInput, errorMsg: 'Please enter a valid email' },
    { input: passwordInput, errorMsg: 'Password must be at least 6 characters long' },
    { input: cpasswordInput, errorMsg: 'Passwords do not match' },
  ];

  fields.forEach((field) => {
    const { input, errorMsg } = field;
    const value = input.value.trim();

    if (value === '' || (input === emailInput && !isValidEmail(value)) || (input === passwordInput && value.length < 6) || (input === cpasswordInput && value !== passwordInput.value.trim())) {
      // Display error message for the respective field
      return;
    }
  });

  // Submit regForm if all fields are valid
  regForm.submit();
});

function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}