//Import bibliotek
const createError = require('http-errors'); // błędy http
const cookieSession = require('cookie-session')
const express = require('express'); // express
const path = require('path'); // bibliotek da pobierania śćieżek
const cookieParser = require('cookie-parser'); // biblioteka do ciasteczek
const logger = require('morgan'); // logger
const config = require("./config");
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.db);
}

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const quizRouter = require('./routes/quiz');
const adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // konfiguracja katalogu z widokami
app.set('view engine', 'pug'); // utawienie silnika do szablonów PUG

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  keys: config.keySession,
  maxAge: config.maxAgeSession
}))



app.use( (req, res, next)=>{
  res.locals.path = req.path;
  next();
})


app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);

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
