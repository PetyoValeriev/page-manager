import bcrypt from 'bcrypt';
import mysqlPool from '../database/connection';
import { generateToken } from '../middlewares/authenticateJWT';

async function registerUser(req, res) {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  try {
    const [testResult] = await mysqlPool.execute('SELECT 1');
    console.log('Database Connection Test Result:', testResult);
  } catch (error) {
    console.error('Database Connection Error:', error);
  }

  if (cpassword === password) {
    try {
      const [rows] = await mysqlPool.execute('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length > 0) {
        req.session.flag = 1;
        return res.redirect('/');
      } else {
        const hashpassword = await bcrypt.hash(password, 10);
        const [insertResult] = await mysqlPool.execute('INSERT INTO users(fullname,email,password) VALUES(?,?,?);', [fullname, email, hashpassword]);
        if (insertResult.affectedRows === 1) {
          req.session.flag = 2;

          // Generate a JWT token after successful registration
          const user = { email }; // You can customize the user data as needed
          const token = generateToken(user);

          // Set the token as a cookie
          res.cookie('jwt', token, { httpOnly: true });

          return res.redirect('/admin'); // Redirect to admin page upon successful registration
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
}

export { registerUser };
