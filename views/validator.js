const form = document.querySelector('#regForm');
const fullNameInput = form.querySelector('input[name="fullname"]');
const emailInput = form.querySelector('input[name="email"]');
const passwordInput = form.querySelector('input[name="password"]');
const cpasswordInput = form.querySelector('input[name="cpassword"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullNameValue = fullNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const cpasswordValue = cpasswordInput.value.trim();

  try {
    // Using async/await to handle asynchronous validation
    await validateField(fullNameValue, 'full name');
    await validateField(emailValue, 'email', isValidEmail);
    await validateField(passwordValue, 'password', (value) => value.length >= 6);
    await validateField(cpasswordValue, 'confirm password', (value) => value === passwordValue);

    // Submit form if all fields are valid
    form.submit();
  } catch (error) {
    alert(error);
  }
});

// Modern function for field validation
async function validateField(value, fieldName, validator = (value) => !!value) {
  if (!validator(value)) {
    throw `Please enter a valid ${fieldName}.`;
  }
}

function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}