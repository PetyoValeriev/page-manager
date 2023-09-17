// loginController.js
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/authenticateJWT.js';
import mysqlPool from '../database/connection.js'; // Add .js extensionclear
// Function to perform user login
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Perform user authentication here (check email and password)
    const user = await getUserByEmail(email);

    if (user) {
      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Passwords match, generate a JWT token
        const token = generateToken(user);

        // Set the token as a cookie
        res.cookie('jwt', token, { httpOnly: true });

        // Redirect to the admin page upon successful login
        return res.redirect('/admin');
      }
    }

    // Authentication failed, send an error response
    return res.render('login', { error: 'Invalid email or password' });
  } catch (error) {
    // Handle any errors thrown during authentication
    console.error('Authentication Error:', error);
    return res.render('login', { error: 'An error occurred during authentication' });
  }
}

// Function to retrieve user by email from MySQL database
async function getUserByEmail(email) {
  try {
    const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 1) {
      return rows[0];
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw error; // Handle database query errors
  }
}

export { loginUser };
