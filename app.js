var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/users.routes');
var reparationsRouter = require('./routes/reparations.routes');
var responsableRouter = require('./routes/responsable.routes');

const { MongoClient } = require('mongodb');
const { Parametre } = require('./utils/parametre');
const paiementRouter = require('./routes/paiement.routes');


var app = express();

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reparations', reparationsRouter);
app.use('/responsables',responsableRouter);
app.use('/paiements',paiementRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
  res.render('pages/error');
});

module.exports = app;
