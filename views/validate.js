
// Select the form and its input fields
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
    input: document.querySelector('#slug'), // Add the Slug field here
    error: document.querySelector('#slug-error'),
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    errorMsg: 'Slug must be in lowercase alphanumeric characters separated by hyphens',
  },
];

// Add an event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let hasError = false;

  // Validation logic for each field
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

  // If there are no errors, capture and log the form data
  if (!hasError) {
    const formData = new FormData(form);
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }

    // Use a promise-based approach to wait for logging before submitting the form
    await new Promise((resolve) => {
      // Add a delay (e.g., 1 second) to ensure the log is captured
      setTimeout(() => {
        resolve();
      }, 1000); // Adjust the delay as needed

      // You can remove the delay in a production environment
    });

    // Now, submit the form
    form.submit();
  }
});
