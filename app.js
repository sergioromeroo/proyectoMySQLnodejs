var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const methodOverride = require('method-override')

const session = require('express-session')

const localsUserCheck = require('./middlewares/localsUserCheck')
const coockieCheck = require('./middlewares/cookieCheck')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const { application } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(session({
  secret : "my secret",
  resave: false,
  saveUninitialized:true
}))

app.use(localsUserCheck)//colocarlo aca porq si lo pongo antes no anda
app.use(coockieCheck)//por si cierra el navegador y vuelve a entrar q la cookies siga existiendo

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/apis',require('./routes/api/apis'))//creo la ruta para que pise con /apis
app.use('/apis',require('./routes/api/apiUsers'))//creo la ruta para que pise con /apis


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

module.exports = app;
