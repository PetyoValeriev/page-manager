const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysqlPool = require('../database/connection');
const pgPool = require('../database/postgresConnection.js');






router.get('/logout', function (req, res, next) {
    res.redirect('/');
  }
);

// Route For registration Page
router.get('/registration', function (req, res, next) {
  res.render('registration', { message: 'Welcome, ' + req.session.email });
});

/* GET home page. */
router.get('/', function (req, res, next) {
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

// Handle POST request for User Registration
router.post('/auth_reg', async function (req, res, next) { // Use async/await here
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  if (cpassword === password) {
    try {
      // Use MySQL2 for this query
      const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length > 0) {
        req.session.flag = 1;
        return res.redirect('/');
      } else {
        const hashpassword = await bcrypt.hash(password, 10);
        // Use MySQL2 for this query
        const [insertResult] = await mysqlPool.execute('INSERT INTO users(fullname,email,password) VALUES(?,?,?);', [fullname, email, hashpassword]);
        if (insertResult.affectedRows === 1) {
          req.session.flag = 2;
          return res.redirect('/');
        }
      }
    } catch (err) {
      console.error(err);
      req.session.flag = 3;
      return res.redirect('/');
    }
  } else {
    req.session.flag = 3;
    return res.redirect('/');
  }
});


const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.cookies.jwt; // Assuming you're using cookies to store the token

  if (!token) {
    return res.redirect('/noTOKEN!'); // Redirect to the login page if no token is present
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.redirect('/login'); // Redirect to the login page if the token is invalid
    }

    req.user = user; // Attach the user data to the request object
    next();
  });
}

async function authenticateUser(email, password) {
  try {
    // Query your MySQL database to check if the email and password match a user
    const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 1) {
      const user = rows[0];

      // Compare the provided password with the hashed password stored in MySQL
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Passwords match, return the user's data (you can customize this as needed)
        return user;
      }
    }

    // No user with the provided email found in MySQL or passwords don't match
    return null;
  } catch (error) {
    // Handle any database errors here
    throw error;
  }
}

// Handle POST request for User Login
router.post('/auth_login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    if (!user) {
      // Authentication failed, send an error response
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(user, 'your-secret-key');

    // Log the token to the console
    console.log('JWT Token:', token);

    // Set the token as a cookie
    res.cookie('jwt', token, { httpOnly: true });

    // Redirect to the admin page upon successful login
    console.log('Authentication successful. Redirecting to /admin');
    res.redirect('/admin');
  } catch (error) {
    // Handle any errors thrown by the authenticateUser function
    console.error('Authentication Error:', error);
    return res.render('login', { error: 'An error occurred during authentication' });
  }
});



// Route For admin Page
router.get('/admin', authenticateJWT, function (req, res, next) {
  console.log('Admin page accessed.');
  console.log('User ID:', req.user.userId);
  console.log('User Email:', req.user.email);

  res.render('admin', { message: 'Welcome, ' + req.user.email }); // Use req.user.email here
});

module.exports = router;