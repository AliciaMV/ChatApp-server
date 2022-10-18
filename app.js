var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

let port = '3004';

// routers
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');

// var
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { 
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//CORS
 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
 })

// routes
app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

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


// socket.io
io.on('connection', (ws) => {
    console.log('>> socket.io >>>> Someone\'s here!');
    io.emit('receive_message', {
      textContent: 'A new user has joined the conversation!',
      author: 'NYAN BOT >^.____.^<',
    });
    ws.emit('receive_message', {
      textContent: 'Welcome',
      author: 'KITTYKAT BOT',
    });
     ws.on('send_message', (textContent, author) => {
       io.emit('receive_message', textContent, author);
     });
});


/*
 * Server
 */
http.listen(port, () => {
  console.log(`listening on *${port}`);
});

module.exports = app;
