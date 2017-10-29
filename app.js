var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var appDiamonds = require('./routes/diamonds');

var app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
//const DATABASE_ADDRESS = 'mongodb://localhost:27017';
const DATABASE_ADDRESS = 'mongodb://' + 'OriAmir' + ':' + '0509731212Aa!' + '@ds131384.mlab.com' + ':' + '31384' + '/' + 'angular-web';

mongoose.Promise = global.Promise;

// // Connect to MongoDB
mongoose.connect(DATABASE_ADDRESS, { useMongoClient: true }, function(err,data){
    if(err)
    {
        console.log('err : ' + err);
    }
    else
    {
        console.log('Connected to Mlab!!!');        
    }
    });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/', appRoutes);

 app.use('/diamonds', appDiamonds);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
