import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT.js'; // Update the path and extension as needed

const router = express.Router();

//get home
router.get('/', (req, res, next) => {
  const flagMessages = {
    1: 'Password Does Not Match.',
    2: 'Incorrect Email or Password.',
  };

  const { flag } = req.session;
  const message = flagMessages[flag] || null;

  if (message) {
    req.session.destroy();
    res.render('login', { title: 'Page Manager', message, flag: flag === 2 ? 0 : 1 });
  } else {
    res.render('login', { title: 'Page Manager' });
  }
});


// Route For admin Page
router.get('/admin', authenticateJWT, (req, res) => {
  console.log('Admin page accessed.');
  console.log('User Email:', req.user.email);

  res.render('admin', { message: 'Welcome, ' + req.user.email }); // Use req.user.email here
});

// Route For registration Page
router.get('/registration', (req, res, next) => {
  res.render('registration', { message: 'Welcome, ' + req.session.email });
});

// Handle GET request for User Logout
router.get('/logout', (req, res) => {
  // Clear the JWT cookie to log the user out
  res.clearCookie('jwt');

  // Redirect to the login page or any other desired location
  return res.redirect('/'); // Assuming you have a '/login' route
});

export default router;
