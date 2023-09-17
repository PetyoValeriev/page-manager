import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/authenticateJWT.js';
import express from 'express';
import mysqlPool from '../database/connection.js';

const authRouter = express.Router();

// Define the registerUser middleware function
async function registerUserMiddleware(req, res, next) {
  const { fullname, email, password, cpassword } = req.body;

  try {
    console.log('Received registration request with data:');
    console.log('Full Name:', fullname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', cpassword);

    // Check if the passwords match
    if (password !== cpassword) {
      console.log('Passwords do not match');
      return res.status(400).render('registration', { error: 'Passwords do not match' });
    }

    // Check if the email already exists in the database
    const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      console.log('Email already exists');
      return res.status(400).render('registration', { error: 'Email already exists' });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const [insertResult] = await mysqlPool.execute(
      'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?);',
      [fullname, email, hashPassword]
    );

    if (insertResult.affectedRows === 1) {
      // Registration successful
      console.log('Registration successful');
      const user = { email }; // Customize user data as needed

      // Generate a JWT token after successful registration
      const token = generateToken(user);

      // Set the token as a cookie
      res.cookie('jwt', token, { httpOnly: true });

      // Redirect to the admin page upon successful registration
      return res.redirect('/admin');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).render('registration', { error: 'An error occurred during registration' });
  }
}

export { authRouter, registerUserMiddleware };
