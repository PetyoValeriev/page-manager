import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT.js'; // Update the path and extension as needed

const router = express.Router();

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

router.get('/', (req, res, next) => {
  if (req.session.flag == 1) {
    req.session.destroy();
    res.render('login', { title: 'Page Manager', message: 'Email Already Exists', flag: 1 });
  } else if (req.session.flag == 2) {
    req.session.destroy();
    res.render('login', { title: 'Page Manager', message: 'Registration Done. Please Login.', flag: 0 });
  } else if (req.session.flag == 3) {
    req.session.destroy();
    res.render('login', { title: 'Page Manager', message: 'Confirm Password Does Not Match.', flag: 1 });
  } else if (req.session.flag == 4) {
    req.session.destroy();
    res.render('login', { title: 'Page Manager', message: 'Incorrect Email or Password.', flag: 1 });
  } else {
    res.render('login', { title: 'Page Manager' });
  }
});

// Route For admin Page
router.get('/admin', authenticateJWT, (req, res) => {
  console.log('Admin page accessed.');
  console.log('User ID:', req.user.userId);
  console.log('User Email:', req.user.email);

  res.render('admin', { message: 'Welcome, ' + req.user.email }); // Use req.user.email here
});

export default router;
