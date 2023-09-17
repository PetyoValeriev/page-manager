// authenticateJWT.js
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretKey = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(user, secretKey);
}

function authenticateJWT(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if the token is invalid
      }

      req.user = user; // Attach the user object to the request
      next(); // Continue with the next middleware
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token is found
  }
}

export { generateToken, authenticateJWT };
