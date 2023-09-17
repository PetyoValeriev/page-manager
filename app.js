import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import createError from 'http-errors';
import adminRouter from './routes/adminRoute.js'; // Update the import path
import { authRouter, registerUserMiddleware } from './controllers/authController.js'; // Import authRouter and registerUserMiddleware as named imports
import { loginUser } from './controllers/loginController.js'; // Import loginUser as a named import
import pagesRoute from './routes/createDeletePageRoute.js'; // Import pagesRouter
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  session({
    secret: 'ABCDefg',
    resave: false,
    saveUninitialized: true,
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', adminRouter);
app.use('/admin', adminRouter);
app.use('/auth_reg', registerUserMiddleware); // Use registerUserMiddleware for registration
app.post('/auth_login', loginUser); // Use POST method for login
app.get('/pages', pagesRoute);
// Other route definitions...







// // Define a route handler for '/pages'
// app.get('/pages', async (req, res) => {
//   try {
//     // Use an async function to await the result of the query
//     const [rows] = await pool.query('SELECT * FROM pages');
    
//     // Assuming 'rows' contains the rows retrieved from the database
//     const pages = rows;

//     // Render a view with the retrieved pages data
//     res.render('pages', { pages });
//   } catch (error) {
//     // Handle errors (e.g., database connection error or query error)
//     console.error('Error fetching pages:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
















app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;