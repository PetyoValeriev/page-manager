let express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let path = require('path');
let createError = require('http-errors');
let adminRouter = require('./routes/admin')

let app = express();

app.use(session({
  secret : 'ABCDefg',
  resave : false,
  saveUninitialized : true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//admin panel router
app.use('/', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Create Server
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

module.exports = app;