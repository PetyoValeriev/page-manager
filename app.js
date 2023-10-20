import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import createError from 'http-errors';
import adminRouter from './routes/adminRoute.js'; // Update the import path
import { authRouter, registerUserMiddleware } from './controllers/authController.js'; // Import authRouter and registerUserMiddleware as named imports
import { loginUser } from './controllers/loginController.js'; // Import loginUser as a named import
import pagesRoutes from '../page-manager/routes/createDeletePageRoute.js';
import { connectToDatabase } from './database/db.mjs';

import dotenv from 'dotenv';

// Create an instance of the Express application
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Session middleware
app.use(
  session({
    secret: 'ABCDefg',
    resave: false,
    saveUninitialized: true,
  })
);

// Database connection
await connectToDatabase(); // Make sure this is configured properly

// Routes
app.use('/pages', pagesRoutes); // Routes for pages
app.use('/auth_reg', registerUserMiddleware); // User registration
app.post('/auth_login', loginUser); // User login
app.use('/', adminRouter); // Default route for admin
// Other middleware

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Handle other errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error'); // Customize this based on your error handling needs
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default app;