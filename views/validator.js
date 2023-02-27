const form = document.querySelector('#regForm');
const fullNameInput = form.querySelector('input[name="fullname"]');
const emailInput = form.querySelector('input[name="email"]');
const passwordInput = form.querySelector('input[name="password"]');
const cpasswordInput = form.querySelector('input[name="cpassword"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fullNameValue = fullNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const cpasswordValue = cpasswordInput.value.trim();

  if (fullNameValue === '') {
    // display error message for Fullname field
    alert('Please enter your full name.');
    return;
  }

  if (emailValue === '') {
    // display error message for Email field
    alert('Please enter your email address.');
    return;
  } else if (!isValidEmail(emailValue)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (passwordValue === '') {
    // display error message for Password field
    alert('Please enter a password.');
    return;
  } else if (passwordValue.length < 6) {
    alert('Password should be at least 6 characters long.');
    return;
  }

  if (cpasswordValue === '') {
    // display error message for Confirm Password field
    alert('Please confirm your password.');
    return;
  } else if (cpasswordValue !== passwordValue) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  // Submit form if all fields are valid
  form.submit();
});

function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}