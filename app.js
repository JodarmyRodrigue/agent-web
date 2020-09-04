var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);



//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/auth/login');
var registerRouter = require('./routes/auth/register');

var accountRouter = require('./routes/dashboard/account');
var agentsRouter = require('./routes/dashboard/agents');
var createAgentRouter = require('./routes/dashboard/create-agent');
var reportsRouter = require('./routes/dashboard/reports');

var contactRouter = require('./routes/dashboard/forms/contact');
var controlRouter = require('./routes/dashboard/forms/control');
var notificationRouter = require('./routes/dashboard/forms/notification');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var redisClient;
var sessionSecret;

if(process.env.ENV === 'DEV'){
  console.log('Environment: Developpement');
  redisClient = redis.createClient();
  sessionSecret = 'aStOlfO__Is_bEsT_Giirrrl';
}else{
  console.log('Environnment Production');
  redisClient = redis.createClient(process.env.REDIS_URL);
  sessionSecret = process.env.SESSION_SECRET;
}

app.use(session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
}));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/login', loginRouter);
app.use('/auth/register', registerRouter);

app.use('/dashboard/account', accountRouter);
app.use('/dashboard/agents', agentsRouter);
app.use('/dashboard/create-agent', createAgentRouter);
app.use('/dashboard/reports', reportsRouter);

app.use('/dashboard/forms/contact', contactRouter);
app.use('/dashboard/forms/control', controlRouter);
app.use('/dashboard/forms/notification', notificationRouter);

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
